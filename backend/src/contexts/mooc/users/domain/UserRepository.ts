import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { type User } from './User';
import { type UserId } from './value-objects';

export interface UserRepository {
    /**
     * @description list all users
     * @date 11/6/2023 - 6:46:22 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         start: number,
     *         limit: number
     *     ) => Promise<{ total: number; users: User[] }>}
     */
    getAll: (
        start: number,
        limit: number
    ) => Promise<{ total: number; users: User[] }>;

    /**
     * @description list user by ID
     * @date 11/6/2023 - 7:01:37 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: UserId) => Promise<Nullable<User>>}
     */
    getById: (id: UserId) => Promise<Nullable<User>>;

    /**
     * @description Save a user in the database
     * @date 11/6/2023 - 7:02:56 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(user: User) => Promise<User>}
     */
    save: (user: User) => Promise<void>;
}
