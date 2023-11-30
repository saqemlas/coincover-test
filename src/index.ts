import 'dotenv/config';
import { logger } from './utils/logger';
import { config } from './utils/config';
import { Server } from './app';

const start = () => {
  try {
    const app = Server.init().app;
    
    app.listen(config.port, () => {
      logger.info(`=> Listening on port ${config.port}...`);
    });

    logger.info(`=> Running on Process id: ${process.pid}...`);
  } catch (error) {
    logger.error('Unable to listen to application', { error });
    process.exit(1);
  }
};

start();
