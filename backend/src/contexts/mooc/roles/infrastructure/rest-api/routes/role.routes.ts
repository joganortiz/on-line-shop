import { type Request, type Response, type Router } from 'express';
import { http } from '@contexts/shared/infrastructure/plugins/http';
import { CreateRoleController, GetAllRoleController, GetByIdRoleController } from '../controllers';

const PATH_RUTE = 'roles';
export const register = (router: Router): void => {
    
    router.get(`/${PATH_RUTE}/`, (req: Request, res: Response): void => {
        try {
            new GetAllRoleController(http).run(req, res);
        } catch (error) {
            http.response.error.run(res, http.status.INTERNAL_SERVER_ERROR, error);
        }
    });

    router.get(`/${PATH_RUTE}/:id`, (req: Request, res: Response): void => {
        try {
            new GetByIdRoleController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(res, http.status.INTERNAL_SERVER_ERROR, error);
        }
    });

    router.post(`/${PATH_RUTE}/`, (req: Request, res: Response): void => {
        try {
            new CreateRoleController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(res, http.status.INTERNAL_SERVER_ERROR, error);;
        }
    });
};
