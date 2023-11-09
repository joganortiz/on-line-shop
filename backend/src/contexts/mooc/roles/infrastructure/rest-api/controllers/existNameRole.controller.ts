import { RoleExistByNameUseCase } from '@contexts/mooc/roles/application';
import { type Request, type Response } from 'express';
import { getRoleRepository } from '../../dependencies';
import { UuidV4 } from '@contexts/shared/infrastructure/implementations/uuid';
import { type Http } from '@contexts/shared/domain/interfaces/http';

export class ExistNameRoleController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleGetterByName = new RoleExistByNameUseCase(
                getRoleRepository(),
                new UuidV4()
            );

            const result = await useCaseRoleGetterByName.run(
                req.params.value,
                req.params.id
            );

            this._http.response.success.run(res, this._http.status.OK, {
                exist: result
            });
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
