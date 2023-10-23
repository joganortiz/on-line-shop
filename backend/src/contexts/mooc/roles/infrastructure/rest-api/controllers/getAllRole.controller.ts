import { RoleGetterAllUseCase } from '@contexts/mooc/roles/application';
import { http } from '@contexts/shared/infrastructure/plugins/http';
import { type Request, type Response } from 'express';
import { getRoleRepository } from '../../dependencies';

export default class GetAllRoleController {
    private readonly _http: http;
    constructor( http: http ) {
        this._http = http;
    }

    run = async (_req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleGetterAll = new RoleGetterAllUseCase(
                getRoleRepository()
            )

            const getAllRole = await useCaseRoleGetterAll.run();

            this._http.success.run(res, this._http.status.OK, getAllRole)
        } catch (error: any) {
            const status = error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.error.run(res, status, error);
        }
    };
}
