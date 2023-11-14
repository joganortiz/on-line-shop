import { type Http } from '@src/contexts/shared/domain/interfaces/http';
import { getUserRepository } from '../../dependencies';
import { UserDeleteUseCase } from '../../../application';
import { type Request, type Response } from 'express';

export class DeleteUserController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseUserGetterById = new UserDeleteUseCase(
                getUserRepository()
            );

            const role = await useCaseUserGetterById.run(req.params.id);

            this._http.response.success.run(res, this._http.status.OK, role);
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
