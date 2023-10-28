import { type Response } from 'express';

export interface Http {
    status: Status;
    response: {
        error: ErrorHttp;
        success: SuccessHttp;
    };
}

export interface Status {
    OK: 200;
    CREATED: 201;
    BAD_REQUEST: 400;
    UNAUTHORIZED: 401;
    NOT_FOUND: 404;
    INTERNAL_SERVER_ERROR: 500;
    BAD_GATEWAY: 502;
}

export interface ErrorHttp {
    run: (res: Response, status: number, data: any | string) => void;
}

export interface SuccessHttp {
    run: (res: Response, status: number, data: any | string) => void;
}
