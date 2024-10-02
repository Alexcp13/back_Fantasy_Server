import { Router } from "express";
import { watchesRouter } from "./watch.routes.js";
import { authRouter } from "./auth.routes.js";

import { notificationsRouter } from "./notification.routes.js";

export const indexRoutes = Router();


indexRoutes.use("/watches", watchesRouter)

indexRoutes.use("/auth", authRouter)

indexRoutes.use("/users", usersRouter)

indexRoutes.use("/notifications", notificationsRouter)