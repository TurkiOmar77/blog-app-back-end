import { Router } from "express";
import userRoute from './auth/user.routes'
import { authenticate } from "../middlewares/authenticate.middleware";
import postRote from './posts/post.route'
const router = Router()

router.use('/users',userRoute)
router.use("/posts",authenticate,postRote)
export default router