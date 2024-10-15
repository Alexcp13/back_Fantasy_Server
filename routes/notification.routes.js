
import { Router } from "express"
import { NotificationsController } from "../controllers/Notifications.controller.js"





export const notificationsRouter = Router()


notificationsRouter.get("/notificationsById", NotificationsController.getNotificationsById)

notificationsRouter.post("/createNotification", NotificationsController.createNotification)