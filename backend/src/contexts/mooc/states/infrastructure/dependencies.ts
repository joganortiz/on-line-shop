import env from '@src/contexts/shared/infrastructure/config/env';
import { type StateRepository } from '../domain/StateRepository';
import { MySqlStateRepository } from './implementations';

export const getStateRepository = (): StateRepository => {
    const DATABASE: string = env.get('dataBase').toLowerCase();

    switch (DATABASE) {
        case 'mysql':
            return new MySqlStateRepository();
            break;
        default:
            throw new Error(
                'A usage database has not been defined or is not available'
            );
            break;
    }
};
