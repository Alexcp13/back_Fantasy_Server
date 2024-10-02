import { User } from "../models/User.model";




export class UserControllers {



    static async getUserById(req, res, next) {
        const { id } = req.params;

        User
            .findById(id)
            .then(user => res.json(user))
            .catch(err => next(err));


    }

    static async getUserByPoints(req, res, next) {
        const { points } = req.params;

        User
            .findById(points.id)
            .select({ username: 1, points: 1 })
            .sort({ points: -1 })
            .then(user => res.status(200).res.json(user))
            .catch(err => next(err));


    }
    static async updateUser(req, res, next) {
        const { id } = req.params;
        const { username, points, password, email } = req.body;

        User
            .findByIdAndUpdate(id, { username, points, password, email }, { new: true })
            .then(user => {
                const authToken = user.generateKey()
                res.status(200).json({ authToken });
            })
            .catch(err => next(err));
    }

    static async addPointsToUser(req, res, next) {
        const { id } = req.params;
        const { points } = req.body;

        User
            .findByIdAndUpdate(id, { $inc: { points } }, { new: true })
            .then(user => res.json(user))
            .catch(err => next(err));
    }
    static async removePointsToUser(req, res, next) {
        const { id } = req.params;
        const { points } = req.body;
        User
            .findByIdAndUpdate(id, { $inc: { points: -points } }, { new: true })
            .then(user => res.json(user))
            .catch(err => next(err));
    }

    static async deleteUser(req, res, next) {
        const { id } = req.params;

        User
            .findByIdAndDelete(id)
            .then(() => res.status(204).send())
            .catch(err => next(err));

    }
}