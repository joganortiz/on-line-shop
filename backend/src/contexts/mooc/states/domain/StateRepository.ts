import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { type CountryId } from '../../countries/domain/value-objects';
import { type State } from './State';
import { type StateId } from './value-objects';

export interface StateRepository {
    /**
     * @description list all states
     * @date 11/5/2023 - 12:15:51 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<State[]>}
     */
    getAll: (start?: number, limit?: number) => Promise<State[]>;

    /**
     * @description list By Id State
     * @date 11/5/2023 - 12:30:01 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: StateId) => Promise<Nullable<State>>}
     */
    getById: (id: StateId) => Promise<Nullable<State>>;

    /**
     * @description list all states by id Country
     * @date 11/5/2023 - 12:41:30 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         idCountry: CountryId,
     *         start?: number,
     *         limit?: number
     *     ) => Promise<State[]>}
     */
    getAllByIdCountry: (
        idCountry: CountryId,
        start?: number,
        limit?: number
    ) => Promise<State[]>;
}
