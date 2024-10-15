import { Router } from 'express';


export const router = Router()


router.get("/*", (req, res, next) => {
    res.json("All good in here");
});
