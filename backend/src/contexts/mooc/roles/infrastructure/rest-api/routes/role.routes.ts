import { type Request, type Response, type Router } from 'express';
import GetAllRoleController from '../controllers/getAllRole.controller';
import { http } from '@contexts/shared/infrastructure/plugins/http';

const PATH_RUTE = 'roles';
export const register = (router: Router): void => {
    
    router.get(`/${PATH_RUTE}/`, (req: Request, res: Response): void => {
        try {
            new GetAllRoleController(http).run(req, res);
        } catch (error) {
            
        }
    });
};
