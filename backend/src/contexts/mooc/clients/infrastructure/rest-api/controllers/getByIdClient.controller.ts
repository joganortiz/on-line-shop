import { type Request, type Response } from 'express';
import { type Http } from '@contexts/shared/domain/interfaces/http';
import { ClientGetterByIdUseCase } from '../../../application';
import { getClientRepository } from '../../dependencies';

export class GetByIdClientController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseClientGetterById = new ClientGetterByIdUseCase(
                getClientRepository()
            );

            const role = await useCaseClientGetterById.run(req.params.id);

            this._http.response.success.run(res, this._http.status.OK, role);
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
