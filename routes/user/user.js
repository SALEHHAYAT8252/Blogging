import express from "express"
import { userDashboard } from "../../controller/user/user.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router();

router
.use(auth)

router
.get("/dashboard",userDashboard)


export default router;