import jwt from "jsonwebtoken"


export const setUser = (user) => {
    const token = jwt.sign(user,process.env.PRIVATE_KEY);
    return token;
}

export const getUser = (token) => {
    try {
        if (!token) {
            return null;
        }

        const user = jwt.verify(token,process.env.PRIVATE_KEY, function (err, decoded) {
            if (err) {
                return null;
            }
            return decoded;
        })
        return user;
    } catch (err) {
        return null;
    }
}
