import { http } from '@src/contexts/shared/infrastructure/plugins/http';
import { type Request, type Response, type Router } from 'express';

const PATH_RUTE = 'auth';
export const register = (router: Router): void => {
    router.post(`/${PATH_RUTE}/`, (_req: Request, res: Response): void => {
        try {
            res.json({
                ok: 'llego al modulo de login'
            });
        } catch (error: any) {
            http.response.error.run(
                res,
                http.status.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });
};
