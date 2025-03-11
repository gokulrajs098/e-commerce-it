const mongoose = require("mongoose")


async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://serajgokul19:0Fp4LjWUC3GhPENZ@cluster0.nif4t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB