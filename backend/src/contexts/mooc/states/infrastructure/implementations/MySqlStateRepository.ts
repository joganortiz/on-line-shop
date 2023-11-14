import { type CountryId } from '@src/contexts/mooc/countries/domain/value-objects';
import { State } from '../../domain/State';
import { type StateRepository } from '../../domain/StateRepository';
import { StateEntityMysql } from '../persistence/typeorm';
import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { type StateId } from '../../domain/value-objects';

export class MySqlStateRepository implements StateRepository {
    /**
     * @description list all states
     * @date 11/5/2023 - 12:15:28 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<{}>}
     */
    getAll = async (
        start?: number,
        limit?: number
    ): Promise<{ total: number; states: State[] }> => {
        const limitQuery: { skip?: number; take?: number } = {
            skip: undefined,
            take: undefined
        };

        if (limit !== undefined && limit > 0) {
            limitQuery.skip = start;
            limitQuery.take = limit;
        }

        const items = await StateEntityMysql.find({
            select: {
                country: {
                    _id: true,
                    name: true
                }
            },
            relations: {
                country: true
            },
            order: {
                name: 'ASC'
            },
            ...limitQuery
        });

        const total = await StateEntityMysql.count();

        const states = items.map((item) => {
            return State.fromPrimitives(item);
        });

        return { total, states };
    };

    /**
     * @description list By Id State
     * @date 11/5/2023 - 12:29:39 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: StateId) => Promise<Nullable<State>>}
     */
    getById = async (id: StateId): Promise<Nullable<State>> => {
        const state = await StateEntityMysql.findOne({
            select: {
                country: {
                    _id: true,
                    name: true,
                    iso3: true,
                    currencySymbol: true,
                    flag: true,
                    phoneCode: true
                }
            },
            relations: {
                country: true
            },
            where: {
                _id: id._value
            }
        });

        if (state === null) return null;

        return State.fromPrimitives(state);
    };

    /**
     * @description list state by ID and ID country
     * @date 11/13/2023 - 10:38:27 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: StateId, idCountry: CountryId) => Promise<Nullable<State>>}
     */
    getByIdAndIdCountry = async (
        id: StateId,
        idCountry: CountryId
    ): Promise<Nullable<State>> => {
        const state = await StateEntityMysql.findOne({
            select: {
                country: {
                    _id: true
                }
            },
            relations: {
                country: true
            },
            where: {
                _id: id._value,
                country: {
                    _id: idCountry._value
                }
            }
        });

        if (state === null) return null;

        return State.fromPrimitives(state);
    };

    /**
     * @description list all states by id Country
     * @date 11/5/2023 - 12:40:47 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(idCountry: CountryId, start?: number, limit?: number) => Promise<{}>}
     */
    getAllByIdCountry = async (
        idCountry: CountryId,
        start?: number,
        limit?: number
    ): Promise<{ total: number; states: State[] }> => {
        const limitQuery: { skip?: number; take?: number } = {
            skip: undefined,
            take: undefined
        };

        if (limit !== undefined && limit > 0) {
            limitQuery.skip = start;
            limitQuery.take = limit;
        }

        const items = await StateEntityMysql.find({
            select: {
                country: {
                    _id: true,
                    name: true
                }
            },
            relations: {
                country: true
            },
            order: {
                name: 'ASC'
            },
            where: {
                country: {
                    _id: idCountry._value
                }
            },
            ...limitQuery
        });

        const total = await StateEntityMysql.count({
            where: {
                country: {
                    _id: idCountry._value
                }
            }
        });

        const states = items.map((item) => {
            return State.fromPrimitives(item);
        });

        return { total, states };
    };
}
