import { IUserDocument } from '@/src/models/user';

declare global {
  namespace Express {
    interface Request {
      userInfo?: IUserDocument;
    }
  }
}
