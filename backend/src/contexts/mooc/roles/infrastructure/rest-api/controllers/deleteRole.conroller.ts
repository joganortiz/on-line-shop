import { RoleDeleteUseCase } from '@contexts/mooc/roles/application';
import { type Request, type Response } from 'express';
import { getRoleRepository } from '../../dependencies';
import { type Http } from '@contexts/shared/domain/interfaces/http';

export class DeleteRoleController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleDelete = new RoleDeleteUseCase(
                getRoleRepository()
            );

            const roleToDelete = await useCaseRoleDelete.run(req.params.id);

            this._http.response.success.run(
                res,
                this._http.status.OK,
                roleToDelete
            );
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
