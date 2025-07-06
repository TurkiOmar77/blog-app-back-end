import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { loginUserSchema, registerUserSchema } from "../../validations/user.validation";
import { asyncHandler } from "../../utils/asyncHandler";
import { loginUser, registerUser } from "../../controllers/auth/user.controller";

const router = Router()

router.post('/register',validate(registerUserSchema) , asyncHandler(registerUser))
router.post('/login' , validate(loginUserSchema), asyncHandler(loginUser))

export default router