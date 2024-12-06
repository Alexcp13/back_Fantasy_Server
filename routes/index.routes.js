import { Router } from "express";
import { watchesRouter } from "./watch.routes.js";
import { authRouter } from "./auth.routes.js";


import { usersRouter } from "./user.routes.js";
import { packsRouter } from "./packs.routes.js";
import { salesRouter } from "./sales.routes.js";


export const indexRoutes = Router();


indexRoutes.use("/watches", watchesRouter)

indexRoutes.use("/auth", authRouter)

indexRoutes.use("/users", usersRouter)

indexRoutes.use("/packs", packsRouter)

indexRoutes.use("/sales", salesRouter)