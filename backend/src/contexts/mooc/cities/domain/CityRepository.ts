import { type City } from './City';

export interface CityRepository {
    /**
     * @description list all cities
     * @date 11/5/2023 - 1:10:35 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<City[]>}
     */
    getAll: (start?: number, limit?: number) => Promise<City[]>;
}
