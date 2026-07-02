import { app } from "./app.js";
import { v2 as cloudinary } from 'cloudinary';
app.listen(process.env.PORT,()=>{
    console.log(`Server listen at port ${process.env.PORT}`);
})
cloudinary.config({ 
      cloud_name: process.env.cloud_name, 
      api_key: process.env.api_key, 
      api_secret: process.env.api_secret
  });