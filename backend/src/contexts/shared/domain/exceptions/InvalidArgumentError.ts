import { http } from '@contexts/shared/infrastructure/plugins/http';

export class InvalidArgumentError {
    constructor(message: string, status?: number) {
        const err: { status?: number; message: string } = new Error(message);

        err.status = status ?? http.status.INTERNAL_SERVER_ERROR;
        throw err;
    }
}
