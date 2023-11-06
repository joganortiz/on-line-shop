import { http } from '@src/contexts/shared/infrastructure/plugins/http';
import { type Request, type Response, type Router } from 'express';
import { GetAllUserController } from '../controllers';

const PATH_RUTE = 'users';
export const register = (router: Router): void => {
    router.get(`/${PATH_RUTE}/`, (req: Request, res: Response): void => {
        try {
            new GetAllUserController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });
};
