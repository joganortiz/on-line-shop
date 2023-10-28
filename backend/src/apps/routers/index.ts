import { type Router } from 'express';
import { globSync } from 'glob';
import path from 'path';

/**
 * @description unction that gets all the path files of the project
 * @date 10/27/2023 - 9:25:00 PM
 * @author Jogan Ortiz Muñoz
 *
 * @type {(router: Router) => void}
 */
export const registerRoutes = (router: Router): void => {
    const routesPath: string[] = globSync(
        path.join(
            __dirname,
            '/../../contexts/mooc/**/infrastructure/rest-api/routes/*.routes.{ts,js}'
        )
    );

    routesPath.map(async (routePath: string) => {
        await register(routePath, router);
    });
};

/**
 * @description function that creates a path for each file
 * @date 10/21/2023 - 10:13:09 PM
 * @author Jogan Ortiz Muñoz
 *
 * @type {(routePath: string, router: Router) => Promise<void>}
 */
const register = async (routePath: string, router: Router): Promise<void> => {
    const { register } = (await require(routePath)) as {
        register: (router: Router) => void;
    };

    register(router);
};
