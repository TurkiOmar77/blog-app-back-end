import { BaseController } from "../general/base.controller";
import { PostService } from "../../services/posts/post.service";
import { Request } from "express";

export class PostController extends BaseController<'post'>{
    constructor(){
        super(new PostService)
    }

    protected override beforeCreate(req: Request, data: any): any {
    const userId = (req as any).user.userId; 
    console.log(userId)
    return {
      ...data,
      authorId: userId, 
    };
  }
}