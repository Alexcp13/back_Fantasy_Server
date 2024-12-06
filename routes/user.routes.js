
import { UserControllers } from "../controllers/User.controller.js"
import { Router } from "express"
import { isAuth } from "../middlewares/token.js"
export const usersRouter = Router()


usersRouter.get('/userById/:id', isAuth, UserControllers.getUserById)
usersRouter.get('/usersByPoints', UserControllers.getUserByPoints)
usersRouter.get('/:id/myWatches', isAuth, UserControllers.getMyAllWatches);
usersRouter.put('/update/:id', isAuth, UserControllers.updateUser)
usersRouter.patch('/:id/addPointsTo', isAuth, UserControllers.addPointsToUser)
usersRouter.patch('/:id/removePointsTo', isAuth, UserControllers.removePointsToUser)
usersRouter.patch('/:id/addWatchsTo', isAuth, UserControllers.addWatches)
usersRouter.patch('/:id/removeWatchesTo', isAuth, UserControllers.removeWatches)
usersRouter.delete('/delete/:id', UserControllers.deleteUser)
