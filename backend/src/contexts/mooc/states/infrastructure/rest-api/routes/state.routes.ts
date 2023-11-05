import { type Request, type Response, type Router } from 'express';

import { http } from '@src/contexts/shared/infrastructure/plugins/http';
import {
    GetAllStateByIdCountryController,
    GetAllStatesController,
    GetByIdStateController
} from '../controllers';

const PATH_RUTE = 'states';
export const register = (router: Router): void => {
    router.get(`/${PATH_RUTE}/`, (req: Request, res: Response): void => {
        try {
            new GetAllStatesController(http).run(req, res);
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
            new GetByIdStateController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });

    router.get(
        `/${PATH_RUTE}/country/:id`,
        (req: Request, res: Response): void => {
            try {
                new GetAllStateByIdCountryController(http).run(req, res);
            } catch (error: any) {
                http.response.error.run(
                    res,
                    http.status.INTERNAL_SERVER_ERROR,
                    error
                );
            }
        }
    );
};
