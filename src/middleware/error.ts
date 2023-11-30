import { Request, Response } from 'express';

const noRouteHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        id: req.headers.referer,
        message: 'Route Not Found!'
    });
};

export { noRouteHandler };
