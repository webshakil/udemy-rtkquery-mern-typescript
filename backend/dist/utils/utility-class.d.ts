declare class ErrorHandler extends Error {
    message: string;
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export default ErrorHandler;
