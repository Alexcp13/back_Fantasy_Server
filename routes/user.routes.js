
import { UserControllers } from "../controllers/User.controller.js"
import { Router } from "express"
import { isAuth } from "../middlewares/token.js"
export const usersRouter = Router()


usersRouter.get('/userById/:id', isAuth, UserControllers.getUserById)
usersRouter.get('/userByPoints/id', isAuth, UserControllers.getUserByPoints)
usersRouter.put('/update/:id', isAuth, UserControllers.updateUser)
usersRouter.patch('/addPointsTo/:id', UserControllers.addPointsToUser)
usersRouter.patch('/removePointsTo/:id', UserControllers.removePointsToUser)
usersRouter.patch('/addWatchsTo/:id', isAuth, UserControllers.addWatches)
usersRouter.patch('/removeWatchesTo/:id', isAuth, UserControllers.removeWatches)
usersRouter.delete('/delete/:id', UserControllers.deleteUser)
