import { Router } from "express";
import { eventRouters } from "./event";
<<<<<<< HEAD
import { userRouters } from "./user";
=======
>>>>>>> main

const router = Router();

router.use(eventRouters);
<<<<<<< HEAD
router.use(userRouters)
=======
>>>>>>> main

export { router as apiRouters };