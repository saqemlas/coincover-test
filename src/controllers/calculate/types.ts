
export interface CalculateEvent {
    operand1: number;
    operand2: number;
    operation: string;
};

export interface CalculateResponse {
    problem: Problem;
    solution: number;
};

interface Problem {
    op1: number;
    op2: number;
    operation: string;
};
