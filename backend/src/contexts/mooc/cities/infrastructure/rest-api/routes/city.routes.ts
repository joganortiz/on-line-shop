import { http } from '@src/contexts/shared/infrastructure/plugins/http';
import { type Request, type Response, type Router } from 'express';
import {
    GetAllCitiesController,
    GetAllCityByIdStateController,
    GetByIdCityController
} from '../controllers';

const PATH_RUTE = 'cities';
export const register = (router: Router): void => {
    router.get(`/${PATH_RUTE}/`, (req: Request, res: Response): void => {
        try {
            new GetAllCitiesController(http).run(req, res);
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
            new GetByIdCityController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });

    router.get(
        `/${PATH_RUTE}/state/:id`,
        (req: Request, res: Response): void => {
            try {
                new GetAllCityByIdStateController(http).run(req, res);
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
