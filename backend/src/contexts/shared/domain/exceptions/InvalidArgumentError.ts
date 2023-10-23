import httpStatus from 'http-status';

export class InvalidArgumentError {
    constructor(message: string, status?: number) {
        const err: { status?: number; message: string } = new Error(message);

        err.status = status ?? httpStatus.INTERNAL_SERVER_ERROR;
        throw err;
    }
}
