import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { City } from '../../domain/City';
import { type CityRepository } from '../../domain/CityRepository';
import { type CityId } from '../../domain/value-objects';
import { CityEntityMysql } from '../persistence/typeorm';
import { type StateId } from '@src/contexts/mooc/states/domain/value-objects';

export class MySqlCityRepository implements CityRepository {
    /**
     * @description list all cities
     * @date 11/5/2023 - 8:54:09 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<{ total: number; cities: {}; }>}
     */
    getAll = async (
        start?: number,
        limit?: number
    ): Promise<{ total: number; cities: City[] }> => {
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

        const total = await CityEntityMysql.count();

        const cities = items.map((item) => {
            return City.fromPrimitives(item);
        });

        return { total, cities };
    };

    /**
     * @description list city by ID
     * @date 11/5/2023 - 8:16:42 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: CityId) => Promise<Nullable<City>>}
     */
    getById = async (id: CityId): Promise<Nullable<City>> => {
        const city = await CityEntityMysql.findOne({
            relations: {
                country: true,
                state: {
                    country: false
                }
            },
            order: {
                name: 'ASC'
            },
            where: {
                _id: id._value
            }
        });

        if (city === null) return null;

        return City.fromPrimitives(city);
    };

    /**
     * @description list all city By ID State
     * @date 11/5/2023 - 8:54:54 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(idState: StateId, start?: number, limit?: number) => Promise<{ total: number; cities: {}; }>}
     */
    getAllByIdState = async (
        idState: StateId,
        start?: number,
        limit?: number
    ): Promise<{ total: number; cities: City[] }> => {
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
            where: {
                state: {
                    _id: idState._value
                }
            },
            ...limitQuery
        });

        const total = await CityEntityMysql.count({
            where: {
                state: {
                    _id: idState._value
                }
            }
        });

        const cities = items.map((item) => {
            return City.fromPrimitives(item);
        });

        return { cities, total };
    };
}
