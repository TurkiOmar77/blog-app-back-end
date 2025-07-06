import { Router } from "express";
import userRoute from './auth/user.routes'
const router = Router()

router.use('/users',userRoute)
export default router