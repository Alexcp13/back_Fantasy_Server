import { Watches } from "../models/Watch.model.js";


export class WatchesControllers {

    static async getAllWatches(req, res, next) {


        Watches
            .find()
            .then(watches => res.json(watches))
            .catch(err => next(err));

    }

    static getAllwatchesById = (req, res, next) => {

        const { id } = req.params

        Watches
            .findById(id)
            .then(watches => {
                res.json(watches);
            })

            .catch(err => next(err));

    }

    static createWatch = (req, res, next) => {


        const newWatch = new Watches(req.body);

        newWatch
            .save()
            .then(savedWatch => res.json(savedWatch))
            .catch(err => next(err));
    }

    static updateWatch = (req, res, next) => {

        const { id } = req.params;
        const { brand, model, caseMaterial, strapMaterial, crystalMaterial, points, watchImg } = req.body

        Watches
            .findByIdAndUpdate(id, { brand, model, caseMaterial, strapMaterial, crystalMaterial, points, watchImg }, { new: true })
            .then(updatedWatch => res.json(updatedWatch))
            .catch(err => next(err));
    }

    static deleteWatch = (req, res, next) => {

        const { id } = req.params
        Watches
            .findByIdAndDelete(id)
            .then((deleteWatch) => res.json(deleteWatch))
            .catch(err => next(err));
    }


}

