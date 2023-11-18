import { http } from '@src/contexts/shared/infrastructure/plugins/http';
import { type Request, type Response, type Router } from 'express';
import {
    CreateClientController,
    DeleteClientController,
    GetAllClientController,
    GetByIdClientController,
    UpdateClientController
} from '../controllers';

const PATH_RUTE = 'clients';
export const register = (router: Router): void => {
    router.get(`/${PATH_RUTE}/`, (req: Request, res: Response): void => {
        try {
            new GetAllClientController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });

    router.get(`/${PATH_RUTE}/:id`, (req: Request, res: Response): void => {
        try {
            new GetByIdClientController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });

    router.post(`/${PATH_RUTE}/`, (req: Request, res: Response): void => {
        try {
            new CreateClientController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });

    router.put(`/${PATH_RUTE}/:id`, (req: Request, res: Response): void => {
        try {
            new UpdateClientController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });

    router.delete(`/${PATH_RUTE}/:id`, (req: Request, res: Response): void => {
        try {
            new DeleteClientController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });
};
