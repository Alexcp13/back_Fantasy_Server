import { User } from "../models/User.model.js"
import bcrypt from 'bcrypt'
import { generateKey } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';

export class AuthControllers {

    static signIn(req, res, next) {
        const { email, password, username } = req.body


        if (!email || !password || !username) {
            return res.status(400).json({ errorMessages: ['Email, Password, and Username are required'] });
        }

        User
            .create({ email, password, username })
            .then(user => {
                const token = generateKey(user._id);

                res.status(201).json({ message: 'User created successfully', token, user });
            })

            .catch(err => next(err))

    }


    static login(req, res, next) {

        const { username, password } = req.body
        if (username === '' || password === '') {
            res.status(400).json({ message: 'Please provide both email and password' })
        }

        User
            .findOne({ username })
            .then(user => {
                if (!user) {
                    return res.status(400).json({ message: 'El usuario o la contraseña son incorrectos' });
                }

                if (bcrypt.compareSync(password, user.password)) {
                    const token = generateKey(user._id);
                    return res.status(200).json({ user, token });
                } else {
                    return res.status(400).json({ errorMesages: ["Credentials doesn't match"] })
                }
            })
            .catch(err => next(err));

    }
    static verify(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.sendStatus(401);


        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            return res.sendStatus(200);
        });

    }


}