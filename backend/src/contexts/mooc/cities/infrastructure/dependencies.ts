import env from '@src/contexts/shared/infrastructure/config/env';
import { type CityRepository } from '../domain/CityRepository';
import { MySqlCityRepository } from './implementations/MySqlCityRepository';

export const getCityeRepository = (): CityRepository => {
    const DATABASE: string = env.get('dataBase').toLowerCase();

    switch (DATABASE) {
        case 'mysql':
            return new MySqlCityRepository();
            break;
        default:
            throw new Error(
                'A usage database has not been defined or is not available'
            );
            break;
    }
};
