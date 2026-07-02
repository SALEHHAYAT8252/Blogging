import mongoose from "mongoose";

export const dbConnect = ()=>{
    mongoose.connect(process.env.URI,{dbName:"blogging"})
    .then(()=>{
        console.log("Connected Successfull");
    })
    .catch((err)=>{
        console.log(err)
    })
}