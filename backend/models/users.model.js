import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum:['student','recruiter']
    },
    profile:{
        bio:{type:string},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId},
        profilePhoto:{
            type:String,
            default:""
        }
    }
});

export default mongoose.model('User',userSchema);