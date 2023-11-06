import env from '@src/contexts/shared/infrastructure/config/env';
import { type UserRepository } from '../domain/UserRepository';
import { MySqlUserRepository } from './implementations';
import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';

export const getUserRepository = (): UserRepository => {
    const DATABASE: string = env.get('dataBase').toLowerCase();

    switch (DATABASE) {
        case 'mysql':
            return new MySqlUserRepository();
            break;
        default:
            throw new InvalidArgumentError(
                'A usage database has not been defined or is not available',
                500
            );
            break;
    }
};
