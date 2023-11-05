import { type Http } from '@src/contexts/shared/domain/interfaces/http';
import { type Request, type Response } from 'express';
import { PermissionByRoleGetterAll } from '../../../application';
import { getPermissionRepository } from '../../dependencies';
import { getSubModuleRepository } from '@src/contexts/mooc/subModule/infrastructure/dependencies';
import { getRoleRepository } from '@src/contexts/mooc/roles/infrastructure/dependencies';

export class GetAllRolePermissionController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const caseOfUseGetAllRolePermission = new PermissionByRoleGetterAll(
                getPermissionRepository(),
                getSubModuleRepository(),
                getRoleRepository()
            );

            const result = await caseOfUseGetAllRolePermission.run(
                req.params.id ?? ''
            );

            this._http.response.success.run(res, this._http.status.OK, result);
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
