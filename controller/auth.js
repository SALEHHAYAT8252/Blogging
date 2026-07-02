import { User } from "../models/user.js";
import { setUser } from "../services/auth.js";
import { cloudinaryUpload } from "../services/cloudinary.js";
import bcrypt from "bcrypt"

export const signupForm = (req, res) => {
    res.render("auth/signup", { formData: {}, error: null })
}

export const signinForm = (req, res) => {
    res.render("auth/signin", { formData: {}, error: null, registered: req.query.registered || false })
}
export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, fullname } = req.body;
        if (!username || !email || !password || !confirmPassword) {
            return res.render("auth/signup", { formData: { username, email, fullname }, error: "All field are required." })
        }

        if (password !== confirmPassword) {
            return res.render("auth/signup", { formData: { username, email, fullname }, error: "Password do not match." })
        }

        if (password.length < 6) {
            return res.render("auth/signup", { formData: { username, email, fullname }, error: "Password must at least 6 characters." })
        }
        let avatarUrl = "/images/uploads/default-avatar.png";
        let public_id = `default-avatar-${Date.now()}`;

        const existUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existUser) {
            const message = existUser.email === email ? "Email already registered." : "Username already registered";
            return res.render("auth/signup", { formData: { username, email, fullname }, error: message })
        }

        if (req.file) {
            const uploadResult = await cloudinaryUpload(`public/images/uploads/${req.filename}`)
            avatarUrl = uploadResult.secure_url;
            public_id = uploadResult.public_id;
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            fullname: fullname || "",
            avatar: { url: avatarUrl, public_id },
            role: "USER"
        })

        res.redirect('/signin?registered=true')


    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
}

export const signin = async (req, res) => {
    try {
        let { username, password } = req.body;
        if (!username || !password) {
            return res.render("auth/signin", { formData: { username }, error: "All field are required.", registered: req.query.registered || false })

        }

        const existUser = await User.findOne({ username: username }).select("+password");

        if (!existUser) {
            return res.render("auth/signin", { formData: { username }, error: "Invalid username or password", registered: req.query.registered || false })

        }
        const matchPassword = await bcrypt.compare(password, existUser.password);
        if (!matchPassword) {
            return res.render("auth/signin", { formData: { username }, error: "Wrong Password", registered: req.query.registered || false })

        }


        const token = setUser({
            _id: existUser._id,
            username: existUser.username,
            email: existUser.email,
            fullname: existUser.fullname,
            role: existUser.role,
            avatar: existUser.avatar,
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,                 // 7 days
        });
        return res.redirect('/user/dashboard')
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
}

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/signin");
};