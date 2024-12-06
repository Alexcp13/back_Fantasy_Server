import { Router } from "express";
import { isAuth } from "../middlewares/token.js";
import { SaleController } from "../controllers/Sale.controller.js";

export const salesRouter = Router();

salesRouter.get('/marketplace', SaleController.getWatchesForSale);
salesRouter.put('/:id/sell', isAuth, SaleController.sellWatch);
salesRouter.put('/:id/buy', isAuth, SaleController.buyWatch);


