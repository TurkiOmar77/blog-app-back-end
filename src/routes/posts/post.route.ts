import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { PostController } from "../../controllers/posts/post.controller";
import { authenticate } from "../../middlewares/authenticate.middleware";

const router = Router()
const postController = new PostController()


router.post('/',asyncHandler(postController.create))
router.get('/',asyncHandler(postController.findAll))
router.get('/:id',asyncHandler(postController.findById))
router.patch('/:id',asyncHandler(postController.update))
router.delete('/id',asyncHandler(postController.delete))

export default router