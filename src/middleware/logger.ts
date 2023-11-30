import { logger } from '../utils/logger';
import { Request, Response } from 'express';

export const loggerHandler = (req: Request, _res: Response): void => {
    const event = {
        ref: req.headers.referer,
        origin: req.headers.origin,
        userAgent: req.headers['user-agent'],
        cookie: req.headers.cookie,
    }
    logger.info('entry event', { event });
};
