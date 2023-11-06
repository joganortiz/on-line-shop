import { type Http } from '@src/contexts/shared/domain/interfaces/http';
import { type Request, type Response } from 'express';
import { UserGetterAllUseCase } from '../../../application';
import { getUserRepository } from '../../dependencies';

export class GetAllUserController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseUserGetterAll = new UserGetterAllUseCase(
                getUserRepository()
            );

            const getAllUsers = await useCaseUserGetterAll.run(req.query);

            this._http.response.success.run(
                res,
                this._http.status.OK,
                getAllUsers
            );
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
