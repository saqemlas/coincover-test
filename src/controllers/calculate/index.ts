import { Request, Response } from 'express';
import { CalculateEvent, CalculateResponse } from './types';
// import { logger } from '../../utils/logger';

export const postCalculate = async (req: Request, res: Response): Promise<void> => {
  const calculation: CalculateEvent = req.body;

  const solution = eval(`${calculation.operand1} ${calculation.operation} ${calculation.operand2}`);

  const response: CalculateResponse = {
    problem: {
      op1: calculation.operand1,
      op2: calculation.operand2,
      operation: calculation.operation
    },
    solution: solution
  };

  res
    .status(200)
    .json(response);
};
