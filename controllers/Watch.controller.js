import { Sale } from "../models/Sale.model.js";
import { User } from "../models/User.model.js";
import { Watches } from "../models/Watch.model.js";

export class WatchesControllers {

    static getAllWatches(req, res, next) {
        Watches
            .find()
            .then(watches => res.json(watches))
            .catch(err => next(err));
    }

    static getMyWatchsById(req, res, next) {
        const { id } = req.params;

        User.findById(id)
            .populate('myWatches')
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(user.myWatches);
            })
            .catch(err => next(err));
    }

    static createWatch(req, res, next) {
        const newWatch = new Watches(req.body);

        newWatch
            .save()
            .then(savedWatch => res.json(savedWatch))
            .catch(err => next(err));
    }

    static updateWatch(req, res, next) {
        const { id } = req.params;
        const { brand, model, caseMaterial, strapMaterial, crystalMaterial, points, watchImg } = req.body;

        Watches
            .findByIdAndUpdate(id, { brand, model, caseMaterial, strapMaterial, crystalMaterial, points, watchImg }, { new: true })
            .then(updatedWatch => res.json(updatedWatch))
            .catch(err => next(err));
    }
    static deleteWatch(req, res, next) {
        const { id } = req.params;

        Watches
            .findByIdAndDelete(id)
            .then((deleteWatch) => res.json(deleteWatch))
            .catch(err => next(err));
    }
}
