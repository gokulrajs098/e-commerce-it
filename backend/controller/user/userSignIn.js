const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    try{
        const { email , password} = req.body

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
             throw new Error("Please provide password")
        }

        const user = await userModel.findOne({email})

       if(!user){
            throw new Error("User not found")
       }

       const checkPassword = await bcrypt.compare(password,user.password)

       console.log("checkPassoword",checkPassword)

       if(checkPassword){
        const tokenData = {
            _id : user._id,
            email : user.email,
        }
        const token = jwt.sign(tokenData, "daec191be517544306e4ba3051fef3cae70d47f4cfddbd185f45d21ec9910848733e084f9d9aeafb12a5f7ed467706d414b9b8fa1a2c3bcea8c28717629445f12aa04d72928ea0ba538824adc03954814bd952b72ace660aa747dd45173b2aae9600d60784c148cf7b92c9176459b99716daac259ba87b4f5be17b31a983ebc4f6c8e73ed0c99f90648818dc1317290449845e4cdc51684c78276aa69e1da64c6a974f03dcadff765c22ed9120dc2472fe96cd8f9d2283d262359897cc83716588491d847f48d6c126eba13fd2e69089d3892f6958557ada0711554888dce689fe9857015f321e44dcc9a623d32e581e919e2b4107898c33b7299e2c40d5ca69", { expiresIn: 60 * 60 * 8 });

        const tokenOption = {
            httpOnly : true,
            secure : true
        }

        res.cookie("token",token,tokenOption).status(200).json({
            message : "Login successfully",
            data : token,
            success : true,
            error : false
        })

       }else{
         throw new Error("Please check Password")
       }

    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }

}

module.exports = userSignInController