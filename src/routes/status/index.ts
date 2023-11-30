import { Request, Response, NextFunction, Router } from 'express';
import { getStatus } from '../../controllers/status';

export class StatusRoute {
  public static path = '/status';
  private static instance: StatusRoute;
  private router = Router();

  private constructor() {
    this.router.get('/', this.get);
  }

  static get router() {
    if (!StatusRoute.instance) {
      StatusRoute.instance = new StatusRoute();
    }
    return StatusRoute.instance.router;
  }

  private get = async (req: Request, res: Response, next: NextFunction) => {
    await getStatus(req, res);
    next();
  };
}
