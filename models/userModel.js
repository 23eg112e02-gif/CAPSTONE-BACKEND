import {Schema,model} from 'mongoose'
const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"]
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,"First name is required"],
        unique:[true,"email already existed"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    profileImageUrl:{
        type:String
    },
    role:{
        type:String,
        enum:["AUTHOR","USER","ADMIN"],
        required:[true,"{value} is an invalid role"]
    },
    isUserActive:{
        type:Boolean,
        default:true
    }
},{
        timestamps:true,
        strict:"throw",
        versionKey:false
     }
)

export const  userModel=model("user",userSchema);