import { ErrorHttp, SuccessHttp } from "./response";
import { status } from "./status";

export interface http {
    status: status;
    error:  ErrorHttp;
    success: SuccessHttp;
}

export const http = {
    status: status,
    error:  ErrorHttp,
    success: SuccessHttp
}