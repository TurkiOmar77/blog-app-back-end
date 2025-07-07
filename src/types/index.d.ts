import 'express'
import { JwtPayload } from './jwt.type'

declare module 'express' {
  export interface Request {
    user?: JwtPayload
  }
}
