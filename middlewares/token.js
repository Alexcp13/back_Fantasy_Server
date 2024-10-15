import { User } from '../models/User.model.js'

import { verifyKey } from '../utils/jwt.js'


export const isAuth = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json(err);
        }

        const token = authHeader.replace("Bearer ", "");


        const { id } = verifyKey(token);

        const user = await User.findById(id);

        user.password = null;
        req.user = user;

        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token", error });
        }
        return res.status(500).json({ message: "Internal server error", error });
    }

}