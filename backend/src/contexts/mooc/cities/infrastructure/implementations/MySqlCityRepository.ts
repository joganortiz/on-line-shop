import { City } from '../../domain/City';
import { type CityRepository } from '../../domain/CityRepository';
import { CityEntityMysql } from '../persistence/typeorm';

export class MySqlCityRepository implements CityRepository {
    /**
     * @description list all cities
     * @date 11/5/2023 - 1:10:25 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<{}>}
     */
    getAll = async (
        start?: number | undefined,
        limit?: number | undefined
    ): Promise<City[]> => {
        const limitQuery: { skip?: number; take?: number } = {
            skip: undefined,
            take: undefined
        };

        if (limit !== undefined && limit > 0) {
            limitQuery.skip = start;
            limitQuery.take = limit;
        }

        const items = await CityEntityMysql.find({
            relations: {
                country: true,
                state: {
                    country: false
                }
            },
            order: {
                name: 'ASC'
            },
            ...limitQuery
        });

        const cities = items.map((item) => {
            return City.fromPrimitives(item);
        });

        return cities;
    };
}
