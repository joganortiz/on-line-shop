import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { Country } from '../../domain/Country';
import { type CountryRepository } from '../../domain/CountryRepository';
import { type CountryId } from '../../domain/value-objects';
import { CountryEntityMysql } from '../persistence/typeorm';

export class MySqlCountryRepository implements CountryRepository {
    /**
     * @description list all countries
     * @date 11/4/2023 - 11:18:23 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<{}>}
     */
    getAll = async (start?: number, limit?: number): Promise<Country[]> => {
        const limitQuery: { skip?: number; take?: number } = {
            skip: undefined,
            take: undefined
        };

        if (limit !== undefined && limit > 0) {
            limitQuery.skip = start;
            limitQuery.take = limit;
        }

        const items = await CountryEntityMysql.find({
            order: {
                name: 'ASC'
            },
            ...limitQuery
        });

        const countries = items.map((item) => {
            return Country.fromPrimitives(item);
        });

        return countries;
    };

    /**
     * @description list by id country
     * @date 11/4/2023 - 11:22:47 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: CountryId) => Promise<Nullable<Country>>}
     */
    getById = async (id: CountryId): Promise<Nullable<Country>> => {
        const country = await CountryEntityMysql.findOne({
            where: {
                _id: id._value
            }
        });

        if (country === null) return null;

        return Country.fromPrimitives(country);
    };
}
