import { http } from '@src/contexts/shared/infrastructure/plugins/http';
import { type Request, type Response, type Router } from 'express';
import { GetAllCitiesController } from '../controllers';

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
};
