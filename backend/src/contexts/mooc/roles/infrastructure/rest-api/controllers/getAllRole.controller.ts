import { type Request, type Response } from 'express';
import { RoleGetterAllUseCase } from '@contexts/mooc/roles/application';
import { getRoleRepository } from '../../dependencies';
import { type Http } from '@contexts/shared/domain/interfaces/http';

export class GetAllRoleController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleGetterAll = new RoleGetterAllUseCase(
                getRoleRepository()
            );

            const result = await useCaseRoleGetterAll.run(req.query);

            this._http.response.success.run(res, this._http.status.OK, result);
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
