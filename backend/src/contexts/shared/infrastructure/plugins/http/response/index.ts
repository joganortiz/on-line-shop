import { type Response } from 'express';
import { http } from '..';
import {
    type SuccessHttp,
    type ErrorHttp
} from '@contexts/shared/domain/interfaces/http';

export const errorHttp: ErrorHttp = {
    run: (res: Response, status: number, data: any | string = ''): void => {
        console.log(data);
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
    }
};

export const successHttp: SuccessHttp = {
    run: <T>(res: Response, status: number, data: T): void => {
        if (status < http.status.OK || status >= http.status.BAD_REQUEST) {
            errorHttp.run(res, http.status.INTERNAL_SERVER_ERROR, '');
            return;
        }

        res.status(status).json({
            status,
            data
        });
    }
};

// export class ErrorHttp implements ErrorHttp {
//     static run = (
//         res: Response,
//         status: number,
//         data: any | string = ''
//     ): void => {
//         console.log(data);
//         let errorMsg = '';

//         errorMsg =
//             status !== http.status.INTERNAL_SERVER_ERROR && data.message !== ''
//                 ? data.message
//                 : 'Unexpected error, talk to administrator';

//         res.status(status).json({
//             status,
//             error: {
//                 message: errorMsg
//             }
//         });
//     };
// }

// export class SuccessHttp implements SuccessHttp {
//     static run = <T>(res: Response, status: number, data: T): void => {
//         if (status < http.status.OK || status >= http.status.BAD_REQUEST) {
//             ErrorHttp.run(res, http.status.INTERNAL_SERVER_ERROR);
//             return;
//         }

//         res.status(status).json({
//             status,
//             data
//         });
//     };
// }
