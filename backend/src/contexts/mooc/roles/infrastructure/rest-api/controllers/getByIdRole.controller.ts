import { type Request, type Response } from 'express';
import { RoleGetterByIdUseCase } from '@contexts/mooc/roles/application';
import { getRoleRepository } from '../../dependencies';
import { type Http } from '@contexts/shared/domain/interfaces/http';

export class GetByIdRoleController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleGetterById = new RoleGetterByIdUseCase(
                getRoleRepository()
            );

            const role = await useCaseRoleGetterById.run(req.params.id);

            this._http.response.success.run(res, this._http.status.OK, role);
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
