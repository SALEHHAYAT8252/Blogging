import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        select:false,
        required:true
    },
    fullname:{
        type:String,
        default:""
    },
    avatar:{
        url:{
            type:String,
            default:"/images/uploads/default-avatar.png"
        },
        public_id:{
            type:String,
            default:`default-avatar-${Date.now()}`
        }
    },
    role:{
        type:String,
        enum:["USER","ADMIN"]
    }
},{
     timestamps: true
})

export const User = mongoose.model("User",userSchema);