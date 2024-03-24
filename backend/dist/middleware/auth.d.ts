import { Response, Request, NextFunction } from 'express';
interface AuthenticatedRequest extends Request {
    user?: any;
}
export declare const requireSignIn: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const isAdmin: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
