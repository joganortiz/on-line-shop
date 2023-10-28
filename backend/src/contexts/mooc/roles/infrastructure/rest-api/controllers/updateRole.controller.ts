import { RoleUpdateUseCase } from '@contexts/mooc/roles/application';
import { type Http } from '@contexts/shared/domain/interfaces/http';
import { type Request, type Response } from 'express';
import { getRoleRepository } from '../../dependencies';

export class UpdateRoleController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleUpdate = new RoleUpdateUseCase(
                getRoleRepository()
            );

            const roleUpdate = await useCaseRoleUpdate.run(
                req.params.id,
                req.body
            );

            this._http.response.success.run(
                res,
                this._http.status.OK,
                roleUpdate
            );
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
