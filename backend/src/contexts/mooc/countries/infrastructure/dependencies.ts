import env from '@contexts/shared/infrastructure/config/env';
import { type CountryRepository } from '../domain/CountryRepository';
import { MySqlCountryRepository } from './implementations';

export const getCountryRepository = (): CountryRepository => {
    const DATABASE: string = env.get('dataBase').toLowerCase();

    switch (DATABASE) {
        case 'mysql':
            return new MySqlCountryRepository();
            break;
        default:
            throw new Error(
                'A usage database has not been defined or is not available'
            );
            break;
    }
};
