import { type Response } from 'express';
import { http } from '..';

export interface ErrorHttp {
    run: (res: Response, status: number, data: any|string) => void
}

export interface SuccessHttp {
    run: (res: Response, status: number, data: any|string) => void
}

export class ErrorHttp implements ErrorHttp{
    static run = (
        res: Response,
        status: number,
        data: any | string = ''
    ): void => {
        // console.log(data);
        let errorMsg = '';

        errorMsg =
            status !== http.status.INTERNAL_SERVER_ERROR && data.message !== ''
                ? data.message
                : 'Unexpected error, talk to administrator';

        res.status(status).json({
            status,
            error: {
                message: errorMsg
            }
        });
    };
}

export class SuccessHttp implements SuccessHttp {
    static run = <T>(res: Response, status: number, data: T): void => {
        if (status < http.status.OK || status >= http.status.BAD_REQUEST) {
            ErrorHttp.run(res,  http.status.INTERNAL_SERVER_ERROR);
            return;
        }

        res.status(status).json({
            status,
            data
        });
    };
}
