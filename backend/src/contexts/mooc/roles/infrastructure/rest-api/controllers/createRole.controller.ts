import { RoleCreateUseCase } from '@contexts/mooc/roles/application';
import { type Request, type Response } from 'express';
import { getRoleRepository } from '../../dependencies';
import { type Http } from '@contexts/shared/domain/interfaces/http';
import { UuidV4 } from '@contexts/shared/infrastructure/implementations/Uuid';

export class CreateRoleController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleCreate = new RoleCreateUseCase(
                getRoleRepository(),
                new UuidV4()
            );

            const roleCreate = await useCaseRoleCreate.run(req.body);

            this._http.response.success.run(
                res,
                this._http.status.CREATED,
                roleCreate
            );
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
