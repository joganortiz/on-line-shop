import { type Request, type Response, type Router } from 'express';
import GetAllRolePermissionController from '../controllers/getAllRolePermission.controller';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

const PATH_RUTE = 'permision';
export const register = (router: Router): void => {
    router.get(
        `/${PATH_RUTE}/role/:id`,
        (req: Request, res: Response): void => {
            try {
                new GetAllRolePermissionController(http).run(req, res);
            } catch (error: any) {
                http.response.error.run(
                    res,
                    http.status.INTERNAL_SERVER_ERROR,
                    error
                );
            }
        }
    );

    // router.put(`/${PATH_RUTE}/role/:id`, (req: Request, res: Response) => {
    //     try {
    //         new UpdateRolePermissionController().run(req, res);
    //     } catch (error) {
    //         ErrorHttp.run(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    //     }
    // });
};
