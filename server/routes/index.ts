import { Router } from "express";
import { cartRouters } from "./cart";
import { eventRouters } from "./event";
import { productRouters } from "./product";
import { statisticRouters } from "./statistic";
import { userRouters } from "./user";

const router = Router();

router.use(eventRouters);
router.use(userRouters);
router.use(productRouters);
router.use(cartRouters);
router.use(statisticRouters);

export { router as apiRouters };