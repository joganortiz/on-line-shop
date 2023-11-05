import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { type CountryId } from './value-objects';
import { type Country } from './Country';

export interface CountryRepository {
    /**
     * @description list all countries
     * @date 11/4/2023 - 11:17:44 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<Country[]>}
     */
    getAll: (start?: number, limit?: number) => Promise<Country[]>;

    /**
     * @description list by id country
     * @date 11/4/2023 - 11:23:18 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: CountryId) => Promise<Nullable<Country>>}
     */
    getById: (id: CountryId) => Promise<Nullable<Country>>;
}
