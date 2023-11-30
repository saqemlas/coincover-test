import { logger } from '../../utils/logger';
import { Request, Response, Router } from 'express';
import { postCalculate } from '../../controllers/index';

export class CalculateRoute {
  public static path = '/calculate';
  private static instance: CalculateRoute;
  private router = Router();

  private constructor() {
    this.router.post('/', this.post);
  }

  static get router() {
    if (!CalculateRoute.instance) {
      CalculateRoute.instance = new CalculateRoute();
    }
    return CalculateRoute.instance.router;
  }

  private post = async (req: Request, res: Response) => {
    await postCalculate(req, res);
  };
}
