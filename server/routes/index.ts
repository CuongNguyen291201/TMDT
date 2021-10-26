import { Router } from "express";
import { eventRouters } from "./event";

const router = Router();

router.use(eventRouters);

export { router as apiRouters };