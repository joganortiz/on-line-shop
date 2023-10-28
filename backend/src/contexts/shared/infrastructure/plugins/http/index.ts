import { type Http } from '@contexts/shared/domain/interfaces/http';
import { errorHttp, successHttp } from './response';
import { status } from './status';

export const http: Http = {
    status,
    response: {
        error: errorHttp,
        success: successHttp
    }
};
