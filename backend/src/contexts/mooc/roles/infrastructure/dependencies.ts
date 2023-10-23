import { MySqlRoleRepository } from './implementations/MySqlRoleRepository';
import { RoleRepository } from '../domain/RoleRepository';
import env from '@contexts/shared/infrastructure/config/env';


/**
 * @description Gets the role repository for the selected database
 * @date 10/21/2023 - 10:27:24 PM
 * @author Jogan Ortiz Muñoz
 *
 * @type {() => RoleRepository}
 */
export const getRoleRepository = (): RoleRepository => {
    const DATABASE: string = env.get('dataBase').toLowerCase();

    switch (DATABASE) {
        case 'mysql':
            return new MySqlRoleRepository();
            break;
        default:
            throw new Error(
                'A usage database has not been defined or is not available',
            );
            break;
    }
};
