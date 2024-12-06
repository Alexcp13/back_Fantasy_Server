import { Watches } from "../models/Watch.model.js";
import { User } from "../models/User.model.js";

export class PacksController {
    static openDailyPack(req, res, next) {
        const userId = req.user._id;

        User.findById(userId)
            .then(user => {
                const now = new Date();
                const lastOpened = user.lastOpened;

                if (!lastOpened || (now - new Date(lastOpened)) >= 12 * 60 * 60 * 1000) {
                    Watches.aggregate([{ $sample: { size: 3 } }])
                        .then(watches => {
                            const watchIds = watches.map(watch => watch._id);

                            User.findByIdAndUpdate(
                                userId,
                                {
                                    $addToSet: { myWatches: { $each: watchIds } },
                                    $set: { lastOpened: now },
                                    $inc: { points: 3000 }
                                },
                                { new: true }
                            )
                                .then(() => res.status(200).json({ message: 'Daily pack opened', newWatches: watches }))
                                .catch(error => next(error));
                        })
                        .catch(error => next(error));
                } else {
                    const remainingTime = (12 * 60 * 60 * 1000) - (now - new Date(lastOpened));
                    const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
                    const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

                    res.status(400).json({
                        message: `Debes esperar ${remainingHours} horas y ${remainingMinutes} minutos para el Daily Packet.`
                    });
                }
            })
            .catch(error => next(error));
    }

    static openBasicPack(req, res, next) {
        const userId = req.user._id;
        const cost = 3000;

        User.findById(userId)
            .then(user => {
                if (user.points >= cost) {
                    Watches.aggregate([
                        { $match: { points: { $gte: 1000, $lte: 5000 } } },
                        { $sample: { size: 5 } }
                    ])
                        .then(watches => {
                            const watchIds = watches.map(watch => watch._id);

                            User.findByIdAndUpdate(
                                userId,
                                {
                                    $addToSet: { myWatches: { $each: watchIds } },
                                    $inc: { points: -cost }
                                },
                                { new: true }
                            )
                                .then(() => res.status(200).json({ message: 'Basic pack opened', newWatches: watches }))
                                .catch(error => next(error));
                        })
                        .catch(error => next(error));
                } else {
                    res.status(400).json({ message: 'No tienes suficientes puntos para abrir el Basic Pack.' });
                }
            })
            .catch(error => next(error));
    }

    static openMediumPack(req, res, next) {
        const userId = req.user._id;
        const cost = 7000;

        User.findById(userId)
            .then(user => {
                if (user.points >= cost) {
                    Watches.aggregate([
                        { $match: { points: { $gt: 5000, $lte: 10000 } } },
                        { $sample: { size: 3 } }
                    ])
                        .then(watches => {
                            const watchIds = watches.map(watch => watch._id);

                            User.findByIdAndUpdate(
                                userId,
                                {
                                    $addToSet: { myWatches: { $each: watchIds } },
                                    $inc: { points: -cost }
                                },
                                { new: true }
                            )
                                .then(() => res.status(200).json({ message: 'Medium pack opened', newWatches: watches }))
                                .catch(error => next(error));
                        })
                        .catch(error => next(error));
                } else {
                    res.status(400).json({ message: 'No tienes suficientes puntos para abrir el Medium Pack.' });
                }
            })
            .catch(error => next(error));
    }

    static openPremiumPack(req, res, next) {
        const userId = req.user._id;
        const cost = 14000;

        User.findById(userId)
            .then(user => {
                if (user.points >= cost) {
                    Watches.aggregate([
                        { $match: { points: { $gt: 10000 } } },
                        { $sample: { size: 1 } }
                    ])
                        .then(watches => {
                            const watchIds = watches.map(watch => watch._id);

                            User.findByIdAndUpdate(
                                userId,
                                {
                                    $addToSet: { myWatches: { $each: watchIds } },
                                    $inc: { points: -cost }
                                },
                                { new: true }
                            )
                                .then(() => res.status(200).json({ message: 'Premium pack opened', newWatches: watches }))
                                .catch(error => next(error));
                        })
                        .catch(error => next(error));
                } else {
                    res.status(400).json({ message: 'No tienes suficientes puntos para abrir el Premium Pack.' });
                }
            })
            .catch(error => next(error));
    }
}
