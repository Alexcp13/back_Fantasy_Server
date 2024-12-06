
import { Router } from "express"

import { PacksController } from "../controllers/pack.controllers.js";
import { isAuth } from "../middlewares/token.js"



export const packsRouter = Router();

packsRouter.get('/dailyPack', isAuth, PacksController.openDailyPack)
packsRouter.get('/basicPack', isAuth, PacksController.openBasicPack)
packsRouter.get('/mediumPack', isAuth, PacksController.openMediumPack)
packsRouter.get('/premiumPack', isAuth, PacksController.openPremiumPack)
