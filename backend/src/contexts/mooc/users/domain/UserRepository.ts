import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { type User } from './User';
import {
    type UserUserName,
    type UserId,
    type UserIdentity,
    type UserEmail,
    type UserPhone,
    type UserProfilePicture
} from './value-objects';

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

    /**
     * @description update user by ID
     * @date 11/13/2023 - 10:23:34 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: UserId, user: User) => Promise<User>}
     */
    update: (id: UserId, user: User) => Promise<User>;

    /**
     * @description update profile user by Id
     * @date 11/12/2023 - 6:33:07 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         id: UserId,
     *         profile: UserProfilePicture
     *     ) => Promise<void>}
     */
    updateProfileById: (
        id: UserId,
        profile: UserProfilePicture
    ) => Promise<void>;

    /**
     * @description delete a user by ID
     * @date 11/12/2023 - 6:34:11 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: UserId) => Promise<boolean>}
     */
    delete: (id: UserId) => Promise<void>;

    /**
     * @description list user by UserName
     * @date 11/11/2023 - 4:45:42 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         username: UserUserName,
     *         id: UserId
     *     ) => Promise<Nullable<User>>}
     */
    getByUserName: (
        username: UserUserName,
        id: UserId
    ) => Promise<Nullable<User>>;

    /**
     * @description list user by identity
     * @date 11/11/2023 - 4:56:03 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         identity: UserIdentity,
     *         id: UserId
     *     ) => Promise<Nullable<User>>}
     */
    getByIdentity: (
        identity: UserIdentity,
        id: UserId
    ) => Promise<Nullable<User>>;

    /**
     * @description list user by email
     * @date 11/11/2023 - 5:03:37 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(email: UserEmail, id: UserId) => Promise<Nullable<User>>}
     */
    getByEmail: (email: UserEmail, id: UserId) => Promise<Nullable<User>>;

    /**
     * @description list user by phone
     * @date 11/11/2023 - 5:03:44 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(phone: UserPhone, id: UserId) => Promise<Nullable<User>>}
     */
    getByPhone: (phone: UserPhone, id: UserId) => Promise<Nullable<User>>;
}
