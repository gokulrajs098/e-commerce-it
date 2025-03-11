const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try{
        const token = req.cookies?.token

        console.log("token",token)
        if(!token){
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, "daec191be517544306e4ba3051fef3cae70d47f4cfddbd185f45d21ec9910848733e084f9d9aeafb12a5f7ed467706d414b9b8fa1a2c3bcea8c28717629445f12aa04d72928ea0ba538824adc03954814bd952b72ace660aa747dd45173b2aae9600d60784c148cf7b92c9176459b99716daac259ba87b4f5be17b31a983ebc4f6c8e73ed0c99f90648818dc1317290449845e4cdc51684c78276aa69e1da64c6a974f03dcadff765c22ed9120dc2472fe96cd8f9d2283d262359897cc83716588491d847f48d6c126eba13fd2e69089d3892f6958557ada0711554888dce689fe9857015f321e44dcc9a623d32e581e919e2b4107898c33b7299e2c40d5ca69", function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded)
            
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id

            next()
        });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}


module.exports = authToken