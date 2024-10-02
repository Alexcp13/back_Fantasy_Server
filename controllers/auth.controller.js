import { User } from "../models/User.model.js"
import bcrypt from 'bcrypt'


export class AuthControllers {

    static signIn(req, res, next) {
        const { email, password, username } = req.body

        User
            .create({ email, password, username })
            .then(() => res.status(201))
            .catch(err => next(err))

    }


    static login(req, res, next) {

        const { email, password } = req.body
        if (email === '' || password === '') {
            res.status(400).json({ message: 'Please provide both email and password' })
        }

        User
            .findOne({ email })
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

}