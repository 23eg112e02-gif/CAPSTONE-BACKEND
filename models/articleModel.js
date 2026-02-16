import {Schema,model} from 'mongoose'
//create user coment schema
const userComentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    coment:{
        type:String
    }
})
// articl schema
const articleSchema=new Schema({
    author:
    {
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Authoer id is required"],

    },
    title:{
        type:String,
        required:[true,"title is required"]
   },
   category:{
    type:String,
     required:[true,"category is required"]
   },
   content:{
     type:String,
     required:[true,"content is required"]
   },
   coments:[userComentSchema],
   isSrticleActive:{
    type:Boolean,
    default:true,
   }
},{
    timestamps:true,
    strict:"throw",
    versionKey:false
})
 export const articleModel=model("article",articleSchema)
