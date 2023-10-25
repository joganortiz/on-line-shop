import { type Request, type Response } from 'express';
import { RoleGetterAllUseCase } from '@contexts/mooc/roles/application';
import { http } from '@contexts/shared/infrastructure/plugins/http';
import { getRoleRepository } from '../../dependencies';

export default class GetAllRoleController {
    private readonly _http: http;
    constructor( http: http ) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleGetterAll = new RoleGetterAllUseCase(
                getRoleRepository()
            )

            const result = await useCaseRoleGetterAll.run(req.query);

            this._http.response.success.run(res, this._http.status.OK, result)
        } catch (error: any) {
            const status = error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
