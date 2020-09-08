declare namespace Express {
   import { User, UserAttributes } from '../models/user';
   export interface Request {
      user?: User
   }

}