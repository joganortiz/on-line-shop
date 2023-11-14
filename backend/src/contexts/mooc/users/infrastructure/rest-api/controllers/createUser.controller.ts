import { type Request, type Response } from 'express';

import { type Http } from '@src/contexts/shared/domain/interfaces/http';
import { UserCreateUseCase } from '../../../application';
import { getUserRepository } from '../../dependencies';
import { getRoleRepository } from '@src/contexts/mooc/roles/infrastructure/dependencies';
import { getCountryRepository } from '@src/contexts/mooc/countries/infrastructure/dependencies';
import { getStateRepository } from '@src/contexts/mooc/states/infrastructure/dependencies';
import { getCityeRepository } from '@src/contexts/mooc/cities/infrastructure/dependencies';
import { UuidV4 } from '@src/contexts/shared/infrastructure/implementations/uuid';
import { Bcrypt } from '@src/contexts/shared/infrastructure/implementations/bcrypt';
import { FileSystem } from '@src/contexts/shared/infrastructure/implementations/FileSystem';

export class CreateUserController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseUserCreate = new UserCreateUseCase(
                getUserRepository(),
                getRoleRepository(),
                getCountryRepository(),
                getStateRepository(),
                getCityeRepository(),
                new UuidV4(),
                new Bcrypt(),
                new FileSystem()
            );

            req.body = { ...req.body, ...req.files };
            const role = await useCaseUserCreate.run(req.body);

            this._http.response.success.run(
                res,
                this._http.status.CREATED,
                role
            );
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
