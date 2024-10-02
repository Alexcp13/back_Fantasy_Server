import { Router } from 'express'
import { AuthControllers } from '../controllers/auth.controller.js'


export const authRouter = Router()



authRouter.post("/signin", AuthControllers.signIn)
authRouter.post("/login", AuthControllers.login)








