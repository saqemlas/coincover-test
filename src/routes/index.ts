import { Router } from 'express';
import { StatusRoute } from './status';
import { CalculateRoute } from './calculate';

const version = 'v1';

export class ApiRoutes {
  public static path = '/' + version;
  private static instance: ApiRoutes;
  private router = Router();

  private constructor() {
    this.router.use(StatusRoute.path, StatusRoute.router);
    this.router.use(CalculateRoute.path, CalculateRoute.router);
  }

  static get router() {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance.router;
  }
}
