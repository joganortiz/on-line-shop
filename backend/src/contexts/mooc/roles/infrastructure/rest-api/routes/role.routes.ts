import { type Request, type Response, type Router } from 'express';
import GetAllRoleController from '../controllers/getAllRole.controller';
import { http } from '@contexts/shared/infrastructure/plugins/http';
import GetByIdRoleController from '../controllers/getByIdRole.controller';

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
};
