import { Request, Response } from 'express';
import { logger } from '../../utils/logger';

export const getStatus = async (_req: Request, res: Response): Promise<void> => {
  res
    .status(200)
};
