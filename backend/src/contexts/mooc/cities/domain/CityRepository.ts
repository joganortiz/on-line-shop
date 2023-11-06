import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { type City } from './City';
import { type CityId } from './value-objects';
import { type StateId } from '../../states/domain/value-objects';

export interface CityRepository {
    /**
     * @description list all cities
     * @date 11/5/2023 - 8:54:19 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         start?: number,
     *         limit?: number
     *     ) => Promise<{ total: number; cities: City[] }>}
     */
    getAll: (
        start?: number,
        limit?: number
    ) => Promise<{ total: number; cities: City[] }>;

    /**
     * @description list city by ID
     * @date 11/5/2023 - 8:17:04 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: CityId) => Promise<Nullable<City>>}
     */
    getById: (id: CityId) => Promise<Nullable<City>>;

    /**
     * @description list all city By ID State
     * @date 11/5/2023 - 8:54:29 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         idState: StateId,
     *         start?: number,
     *         limit?: number
     *     ) => Promise<{ total: number; cities: City[] }>}
     */
    getAllByIdState: (
        idState: StateId,
        start?: number,
        limit?: number
    ) => Promise<{ total: number; cities: City[] }>;
}
