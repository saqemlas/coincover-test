import { getStatus } from '../../src/controllers/status';
import { Request, Response } from 'express';

describe('GET /status', () => {
    const mockResponse = () => {
        const response = {} as Response;
        response.status = jest.fn().mockReturnValue(response);
        return response;
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Status is 200', async () => {
        const request = {} as Request;

        const response = mockResponse();

        await getStatus(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
    });
});
