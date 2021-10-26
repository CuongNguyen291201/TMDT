import { Router } from "express";
import { eventRouters } from "./event";
import { userRouters } from "./user";

const router = Router();

router.use(eventRouters);
router.use(userRouters)

export { router as apiRouters };