import env from '@src/contexts/shared/infrastructure/config/env';
import { type PermissionRoleRepository } from '../domain/PermissionRoleRepository';
import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { MySqlPermissionRoleRepository } from './implementations';

export const getPermissionRepository = (): PermissionRoleRepository => {
    const DATABASE: string = env.get('dataBase').toLowerCase();

    switch (DATABASE) {
        case 'mysql':
            return new MySqlPermissionRoleRepository();
            break;
        default:
            throw new InvalidArgumentError(
                'A usage database has not been defined or is not available',
                500
            );
            break;
    }
};
