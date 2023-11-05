import { type Http } from '@src/contexts/shared/domain/interfaces/http';
import { type Request, type Response } from 'express';
import { StateGetterAllByIdCountryUseCase } from '../../../application';
import { getStateRepository } from '../../dependencies';
import { getCountryRepository } from '@src/contexts/mooc/countries/infrastructure/dependencies';

export class GetAllStateByIdCountryController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const caseOfUseGetAllStateByIdCountry =
                new StateGetterAllByIdCountryUseCase(
                    getStateRepository(),
                    getCountryRepository()
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
