
import { UserControllers } from "../controllers/User.controller"
import { Router } from express

export const usersRouter = Router()


usersRouter.get('/userById/:id', UserControllers.getUserById)
usersRouter.get('/userByPoitns/id', UserControllers.getUserByPoints)
usersRouter.put('/update/:id', UserControllers.updateUser)
usersRouter.patch('/addPointsTo/:id', UserControllers.addPointsToUser)
usersRouter.patch('/removePointsTo/:id', UserControllers.removePointsToUser)
usersRouter.delete('/delete/:id', UserControllers.deleteUser)
