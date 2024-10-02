
import { Routes } from "express"




export const notificationsRouter = Routes()


notificationsRouter.get("/notificationsById", NotificationController.getNotificationById)

notificationsRouter.post("/createNotification", NotificationController.createNotification)