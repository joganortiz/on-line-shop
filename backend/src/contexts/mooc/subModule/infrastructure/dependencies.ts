import env from '@src/contexts/shared/infrastructure/config/env';
import { type SubModuleRepository } from '../domain/SubModuleRepository';
import { MySqlSubModuleRepository } from './implementations';

export const getSubModuleRepository = (): SubModuleRepository => {
    const DATABASE: string = env.get('dataBase').toLowerCase();

    switch (DATABASE) {
        case 'mysql':
            return new MySqlSubModuleRepository();
            break;
        default:
            throw new Error(
                'A usage database has not been defined or is not available'
            );
            break;
    }
};
