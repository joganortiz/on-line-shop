import { type Router } from 'express';
import { globSync } from 'glob';

/**
 * @description function that gets all the path files of the project
 * @date 10/21/2023 - 10:12:47 PM
 * @author Jogan Ortiz Muñoz
 *
 * @type {(router: Router) => Promise<void>}
 */
export const registerRoutes = async (router: Router): Promise<void> => {
	const routesPath: string[] = globSync(
		`${__dirname}/../../contexts/mooc/**/infrastructure/rest-api/routes/*.routes.{ts,js}`
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
