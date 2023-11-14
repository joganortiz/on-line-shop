import { type Http } from '@src/contexts/shared/domain/interfaces/http';
import { UserUpdateUseCase } from '../../../application';
import { getUserRepository } from '../../dependencies';
import { getRoleRepository } from '@src/contexts/mooc/roles/infrastructure/dependencies';
import { getCountryRepository } from '@src/contexts/mooc/countries/infrastructure/dependencies';
import { getStateRepository } from '@src/contexts/mooc/states/infrastructure/dependencies';
import { getCityeRepository } from '@src/contexts/mooc/cities/infrastructure/dependencies';
import { FileSystem } from '@src/contexts/shared/infrastructure/implementations/FileSystem';
import { type Request, type Response } from 'express';

export class UpdateUserController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseUserGetterById = new UserUpdateUseCase(
                getUserRepository(),
                getRoleRepository(),
                getCountryRepository(),
                getStateRepository(),
                getCityeRepository(),
                new FileSystem()
            );

            req.body = { ...req.body, ...req.files };
            const role = await useCaseUserGetterById.run(
                req.params.id,
                req.body
            );

            this._http.response.success.run(res, this._http.status.OK, role);
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
