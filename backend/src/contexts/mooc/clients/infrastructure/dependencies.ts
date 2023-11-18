import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { MySqlClientRepository } from './implementations';
import { type ClientRepository } from '../domain/ClientRepository';
import env from '@src/contexts/shared/infrastructure/config/env';

export const getClientRepository = (): ClientRepository => {
    const DATABASE: string = env.get('dataBase').toLowerCase();

    switch (DATABASE) {
        case 'mysql':
            return new MySqlClientRepository();
            break;
        default:
            throw new InvalidArgumentError(
                'A usage database has not been defined or is not available',
                500
            );
            break;
    }
};
