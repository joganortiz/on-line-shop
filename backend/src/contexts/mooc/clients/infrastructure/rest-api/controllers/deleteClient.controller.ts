import { type Http } from '@src/contexts/shared/domain/interfaces/http';
import { type Request, type Response } from 'express';
import { ClientDeleteUseCase } from '../../../application';
import { getClientRepository } from '../../dependencies';

export class DeleteClientController {
    private readonly _http: Http;
    constructor(http: Http) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseClientDeleter = new ClientDeleteUseCase(
                getClientRepository()
            );

            const clientDelete = await useCaseClientDeleter.run(req.params.id);

            this._http.response.success.run(
                res,
                this._http.status.OK,
                clientDelete
            );
        } catch (error: any) {
            const status =
                error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
