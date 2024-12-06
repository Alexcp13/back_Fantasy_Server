import { User } from "../models/User.model.js";




export class UserControllers {

    static getMyAllWatches(req, res, next) {

        const userId = req.user._id;

        User.findById(userId)
            .populate("myWatches")
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                res.status(200).json({ message: "User's watches fetched", watches: user.myWatches });
            })
            .catch(err => next(err));
    }



    static async getUserById(req, res, next) {
        const { id } = req.params;

        User
            .findById(id)
            .then(user => res.json(user))
            .catch(err => next(err));


    }

    static async getUserByPoints(req, res, next) {
        User.find({})
            .select({ username: 1, points: 1, myWatches: 1 })
            .sort({ points: -1 })
            .limit(10)
            .then(users => {

                const rankedUsers = users.map((user, index) => ({
                    position: index + 1,
                    username: user.username,
                    points: user.points,
                    watchesCount: user.myWatches.length
                }));
                res.status(200).json(rankedUsers);
            })
            .catch(err => next(err));
    } static async updateUser(req, res, next) {
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
            .findByIdAndUpdate(
                id,
                { $inc: { points } },
                { new: true })
            .then(user => res.json(user))
            .catch(err => next(err));
    }
    static async removePointsToUser(req, res, next) {
        const { id } = req.params;
        const { points } = req.body;
        User
            .findByIdAndUpdate(
                id,
                { $inc: { points: -points } },
                { new: true })
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
    static async addWatches(req, res, next) {
        const { id } = req.params;
        const { watchId } = req.body;


        User.findByIdAndUpdate(
            id,
            { $addToSet: { myWatches: watchId } },
            { new: true })


            .then(user => res.json(user))
            .catch(err => next(err));



    }
    static async removeWatches(req, res, next) {
        const { id } = req.params;
        const { watchId } = req.body;

        User.findByIdAndUpdate(
            id,
            { $pull: { myWatches: watchId } },
            { new: true })
            .then(user => res.json(user))
            .catch(err => next(err));
    }
}