import { Sale } from "../models/Sale.model.js";
import { User } from "../models/User.model.js";
import { Watches } from "../models/Watch.model.js";

export class SaleController {

    static sellWatch(req, res, next) {
        const { id } = req.params;
        const { watchId, points } = req.body;

        User.findById(id)
            .then(user => {
                if (!user.myWatches.includes(watchId)) {
                    return res.status(400).json({ message: "El reloj no pertenece al usuario." });
                }

                return Sale.create({ watch: watchId, seller: id, points })
                    .then(sale => {
                        return User.findByIdAndUpdate(
                            id,
                            { $pull: { myWatches: watchId } },
                            { new: true }
                        ).then(() => res.status(201).json({ message: "Reloj puesto a la venta.", sale }));
                    });
            })
            .catch(error => next(error));
    }


    static buyWatch(req, res, next) {
        const { id } = req.params;
        const { saleId } = req.body;

        Sale.findById(saleId)
            .populate("watch seller")
            .then(sale => {
                if (!sale) {
                    return res.status(404).json({ message: "Venta no encontrada." });
                }

                User.findById(id).then(buyer => {
                    if (buyer.points < sale.points) {
                        return res.status(400).json({ message: "No tienes suficientes puntos para comprar este reloj." });
                    }

                    const updateBuyer = User.findByIdAndUpdate(
                        id,
                        { $inc: { points: -sale.points }, $addToSet: { myWatches: sale.watch._id } }
                    );

                    const updateSeller = User.findByIdAndUpdate(
                        sale.seller._id,
                        { $inc: { points: sale.points } }
                    );

                    Promise.all([updateBuyer, updateSeller, Sale.findByIdAndDelete(saleId)])
                        .then(() => {
                            res.status(200).json({ message: "Compra realizada con éxito.", watch: sale.watch });
                        })
                        .catch(error => next(error));
                });
            })
            .catch(error => next(error));
    }


    static getWatchesForSale(req, res, next) {
        Sale.find()
            .populate("watch", "brand model watchImg")
            .populate("seller", "username")
            .then(sales => res.status(200).json({ message: "Relojes en venta obtenidos.", sales }))
            .catch(error => next(error));
    }

}
