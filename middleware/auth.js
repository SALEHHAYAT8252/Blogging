import { getUser } from "../services/auth.js";

export const auth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.redirect("/signin");
  }

  const user = getUser(token);

  if (!user) {
    return res.redirect("/signin");
  }

  req.user = user;         //for controllers
  res.locals.user = user;  // add this — for EJS views
  next();
};