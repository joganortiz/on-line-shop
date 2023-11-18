import { type Http } from '@src/contexts/shared/domain/interfaces/http';
import { getCountryRepository } from '@src/contexts/mooc/countries/infrastructure/dependencies';
import { getStateRepository } from '@src/contexts/mooc/states/infrastructure/dependencies';
import { getCityeRepository } from '@src/contexts/mooc/cities/infrastructure/dependencies';
import { FileSystem } from '@src/contexts/shared/infrastructure/implementations/FileSystem';
import { type Request, type Response } from 'express';
import { getClientRepository } from '../../dependencies';
import { ClientUpdateUseCase } from '../../../application';
import { Bcrypt } from '@src/contexts/shared/infrastructure/implementations/bcrypt';

export class UpdateClientController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseClientUpdate = new ClientUpdateUseCase(
                getClientRepository(),
                getCountryRepository(),
                getStateRepository(),
                getCityeRepository(),
                new Bcrypt(),
                new FileSystem()
            );

            req.body = { ...req.body, ...req.files };
            const clientUpdate = await useCaseClientUpdate.run(
                req.params.id,
                req.body
            );

            this._http.response.success.run(
                res,
                this._http.status.OK,
                clientUpdate
            );
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
