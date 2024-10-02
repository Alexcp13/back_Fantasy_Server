import { Router } from "express";
import { WatchesControllers } from "../controllers/Watch.controller.js";



export const watchesRouter = Router();

watchesRouter.get("/", WatchesControllers.getAllWatches);
watchesRouter.get("/:id", WatchesControllers.getAllwatchesById);
watchesRouter.post("/", WatchesControllers.createWatch);
watchesRouter.put("/:id", WatchesControllers.updateWatch);
watchesRouter.delete("/:id", WatchesControllers.deleteWatch);