import httpStatus from "http-status";

export type status = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502
}

export const status: status = {
    OK: httpStatus.OK, // 200
    CREATED: httpStatus.CREATED, // 201
    BAD_REQUEST: httpStatus.BAD_REQUEST, // 400
    UNAUTHORIZED: httpStatus.UNAUTHORIZED, // 401
    NOT_FOUND: httpStatus.NOT_FOUND, // 404
    INTERNAL_SERVER_ERROR: httpStatus.INTERNAL_SERVER_ERROR, // 500
    BAD_GATEWAY: httpStatus.BAD_GATEWAY // 502
}