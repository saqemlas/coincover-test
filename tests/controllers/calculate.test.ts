import { postCalculate } from '../../src/controllers/calculate/index';
import { CalculateEvent } from '../../src/controllers/calculate/types';
import { Request, Response } from 'express';

describe('POST /calculate', () => {
    const createEvent = (operand1: number, operand2: number, operation: string): CalculateEvent => {
        return {
            operand1,
            operand2,
            operation
        };
    };
    
    const mockResponse = () => {
        const response = {} as Response;
        response.status = jest.fn().mockReturnValue(response);
        response.json = jest.fn().mockReturnValue(response);
        return response;
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    /// ADDITION

    it('Addition: 1 + 1', async () => {
        const request = {
            body: createEvent(1, 1, '+')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': 1, 'op2': 1, 'operation': '+'}, 'solution': 2});
    });

    it('Addition: 1.5 + 1', async () => {
        const request = {
            body: createEvent(1.5, 1, '+')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': 1.5, 'op2': 1, 'operation': '+'}, 'solution': 2.5});
    });

    it('Addition: -1 + 1', async () => {
        const request = {
            body: createEvent(-1, 1, '+')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': -1, 'op2': 1, 'operation': '+'}, 'solution': 0});
    });

    /// SUBTRACT

    it('Subtract: 1 - 1', async () => {
        const request = {
            body: createEvent(1, 1, '-')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': 1, 'op2': 1, 'operation': '-'}, 'solution': 0});
    });

    it('Subtract: 1.5 - 1', async () => {
        const request = {
            body: createEvent(1.5, 1, '-')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': 1.5, 'op2': 1, 'operation': '-'}, 'solution': 0.5});
    });

    it('Subtract: -1 - 1', async () => {
        const request = {
            body: createEvent(-1, 1, '-')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': -1, 'op2': 1, 'operation': '-'}, 'solution': -2});
    });

    /// MULTIPLY

    it('Multiply: 1 * 1', async () => {
        const request = {
            body: createEvent(1, 1, '*')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': 1, 'op2': 1, 'operation': '*'}, 'solution': 1});
    });

    it('Multiply: 1.5 * 1', async () => {
        const request = {
            body: createEvent(1.5, 1, '*')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': 1.5, 'op2': 1, 'operation': '*'}, 'solution': 1.5});
    });

    it('Multiply: -1 * 1', async () => {
        const request = {
            body: createEvent(-1, 1, '*')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': -1, 'op2': 1, 'operation': '*'}, 'solution': -1});
    });

    /// DIVISION

    it('Division: 1 / 1', async () => {
        const request = {
            body: createEvent(1, 1, '/')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': 1, 'op2': 1, 'operation': '/'}, 'solution': 1});
    });

    it('Division: 1.5 / 1', async () => {
        const request = {
            body: createEvent(1.5, 3, '/')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': 1.5, 'op2': 3, 'operation': '/'}, 'solution': 0.5});
    });

    it('Division: -1 / 1', async () => {
        const request = {
            body: createEvent(-1, 2, '/')
        } as Request;

        const response = mockResponse();

        await postCalculate(request, response);
        
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({'problem': {'op1': -1, 'op2': 2, 'operation': '/'}, 'solution': -0.5});
    });
});
