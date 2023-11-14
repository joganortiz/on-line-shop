import { http } from '@src/contexts/shared/infrastructure/plugins/http';
import { type Request, type Response, type Router } from 'express';
import {
    CreateUserController,
    DeleteUserController,
    GetAllUserController,
    GetByIdUserController,
    UpdateUserController
} from '../controllers';

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

    router.get(`/${PATH_RUTE}/:id`, (req: Request, res: Response): void => {
        try {
            new GetByIdUserController(http).run(req, res);
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
            new CreateUserController(http).run(req, res);
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
            new UpdateUserController(http).run(req, res);
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
            new DeleteUserController(http).run(req, res);
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });
};
