import express from "express"
import { config } from "dotenv";
import { dbConnect } from "./database/db.js";
import dns from "dns";
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/user/user.js"
import cookieParser from "cookie-parser";
import blogRoute from "./routes/blogRoute.js"
export const app = express();
dns.setServers(['8.8.8.8','0.0.0.0'])
config({path:"./config/.env"})

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
app.set("view engine","ejs")
app.set("views","views")
app.use('/',authRoute)
app.use('/user',userRoute)
app.use('/blog',blogRoute)
dbConnect();
