import { logger } from './utils/logger';
import express, { Request, Response, NextFunction, Application } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import { loggerHandler } from './middleware/logger';
import { noRouteHandler } from './middleware/error';

import { ApiRoutes } from './routes';

export class Server {

  public static init(): Server {
    logger.info('initializing server...');
    return new Server();
  }

  public app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  public middleware() {
    logger.info('initializing middleware...');
    
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true, }));

    // event logging handling
    this.app.use((req: Request, res: Response, next: NextFunction) => {
        loggerHandler(req, res);
        next();
    });
  };

  private routes() {
    logger.info('initializing routes...');
    this.app.use(ApiRoutes.path, ApiRoutes.router);

    this.app.use((req: Request, res: Response) => {
      noRouteHandler(req, res);
    });
  };
};
