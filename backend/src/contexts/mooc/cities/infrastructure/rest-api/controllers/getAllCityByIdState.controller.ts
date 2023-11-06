import { type Request, type Response } from 'express';

import { type Http } from '@src/contexts/shared/domain/interfaces/http';
import { CityGetterAllByIdStateUseCase } from '../../../application';
import { getCityeRepository } from '../../dependencies';
import { getStateRepository } from '@src/contexts/mooc/states/infrastructure/dependencies';

export class GetAllCityByIdStateController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const caseOfUseGetAllStateByIdCountry =
                new CityGetterAllByIdStateUseCase(
                    getCityeRepository(),
                    getStateRepository()
                );

            const result = await caseOfUseGetAllStateByIdCountry.run(
                req.params.id,
                req.query
            );

            this._http.response.success.run(res, this._http.status.OK, result);
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
