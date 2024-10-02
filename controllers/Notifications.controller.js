import { Notification } from "../models/Notification.model"











export class NotificationsController {



    static async getNotificationsById(req, res, next) {


        Notification
            .find(userId)
            .populate('user', 'username')
            .then(messages => res.json(messages))
            .catch(err => next(err));




    }

    static async createNotification(req, res, next) {
        const { userId, points } = req.body

        const notification = new Notification({ userId, points })

        notification.save()
            .then(savedNotification => res.json(savedNotification))
            .catch(err => next(err));


    }


}
