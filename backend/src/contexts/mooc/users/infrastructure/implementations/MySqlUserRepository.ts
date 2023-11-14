import {
    LockedType,
    RemovedType,
    StatusType
} from '@src/contexts/shared/domain/typeOrm';
import { User } from '../../domain/User';
import { type UserRepository } from '../../domain/UserRepository';
import { UserEntityMysql } from '../persistence/typeorm';
import {
    type UserUserName,
    type UserId,
    type UserIdentity,
    type UserEmail,
    type UserPhone,
    type UserProfilePicture
} from '../../domain/value-objects';
import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { CountryEntityMysql } from '@src/contexts/mooc/countries/infrastructure/persistence/typeorm';
import { StateEntityMysql } from '@src/contexts/mooc/states/infrastructure/persistence/typeorm';
import { CityEntityMysql } from '@src/contexts/mooc/cities/infrastructure/persistence/typeorm';
import { RoleEntityMysql } from '@src/contexts/mooc/roles/infrastructure/persistence/typeorm';
import { Not } from 'typeorm';

export class MySqlUserRepository implements UserRepository {
    /**
     * @description list all users
     * @date 11/6/2023 - 6:46:09 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start: number, limit: number) => Promise<{ total: number; users: {}; }>}
     */
    getAll = async (
        start: number,
        limit: number
    ): Promise<{ total: number; users: User[] }> => {
        const limitQuery: { skip?: number; take?: number } = {
            skip: undefined,
            take: undefined
        };

        if (limit !== undefined && limit > 0) {
            limitQuery.skip = start;
            limitQuery.take = limit;
        }

        const items = await UserEntityMysql.find({
            select: {
                country: {
                    _id: true,
                    name: true
                },
                state: {
                    _id: true,
                    name: true
                },
                city: {
                    _id: true,
                    name: true
                },
                role: {
                    _id: true,
                    name: true
                }
            },
            relations: {
                role: true,
                country: true,
                state: true,
                city: true
            },
            where: {
                removed: RemovedType.NOT_REMOVED
            },
            order: {
                created: 'DESC'
            },
            ...limitQuery
        });

        const total = await UserEntityMysql.count({
            where: {
                removed: RemovedType.NOT_REMOVED
            }
        });

        const users = items.map((item) => {
            return User.fromPrimitives(item);
        });

        return { total, users };
    };

    /**
     * @description list user by ID
     * @date 11/6/2023 - 6:48:22 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: UserId) => Promise<Nullable<User>>}
     */
    getById = async (id: UserId): Promise<Nullable<User>> => {
        const user = await UserEntityMysql.findOne({
            select: {
                country: {
                    _id: true,
                    name: true
                },
                state: {
                    _id: true,
                    name: true
                },
                city: {
                    _id: true,
                    name: true
                },
                role: {
                    _id: true,
                    name: true
                }
            },
            relations: {
                country: true,
                state: true,
                city: true,
                role: true
            },
            where: {
                _id: id._value,
                removed: RemovedType.NOT_REMOVED
            }
        });

        if (user === null) return null;

        return User.fromPrimitives(user);
    };

    /**
     * @description Save a user in the database
     * @date 11/6/2023 - 7:02:35 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(user: User) => Promise<void>}
     */
    save = async (user: User): Promise<void> => {
        const prepareUser = new UserEntityMysql();

        prepareUser._id = user._id._value;
        prepareUser.userName = user.userName._value;
        prepareUser.name = user.name._value;
        prepareUser.lastName = user.lastName._value;
        prepareUser.email = user.email._value;
        prepareUser.identity = user.identity?._value;

        if (user.password?._value !== undefined) {
            prepareUser.password = user.password._value;
        }

        prepareUser.address = user.address?._value;
        prepareUser.phone = user.phone?._value;
        prepareUser.codePhone = user.codePhone?._value;
        prepareUser.status =
            user.status._value === '1'
                ? StatusType.ACTIVE
                : StatusType.INACTIVE;

        if (user.country !== undefined) {
            const prepareCountry = new CountryEntityMysql();
            prepareCountry._id = user.country._id._value;

            prepareUser.country = prepareCountry;
        }

        if (user.state !== undefined) {
            const prepareState = new StateEntityMysql();
            prepareState._id = user.state._id._value;

            prepareUser.state = prepareState;
        }

        if (user.city !== undefined) {
            const prepareCity = new CityEntityMysql();
            prepareCity._id = user.city._id._value;

            prepareUser.city = prepareCity;
        }

        const prepareRole = new RoleEntityMysql();
        prepareRole._id = user.role._id._value;

        prepareUser.role = prepareRole;

        await prepareUser.save();
    };

    /**
     * @description update user by ID
     * @date 11/13/2023 - 10:23:50 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(idUser: UserId, user: User) => Promise<User>}
     */
    update = async (idUser: UserId, user: User): Promise<User> => {
        const prepareUpdate = new UserEntityMysql();

        if (user.userName._value !== undefined)
            prepareUpdate.userName = user.userName._value;

        if (user.name?._value !== undefined)
            prepareUpdate.name = user.name._value;

        if (user.lastName?._value !== undefined)
            prepareUpdate.lastName = user.lastName._value;

        if (user.identity?._value !== undefined)
            prepareUpdate.identity = user.identity._value;

        if (user.email?._value !== undefined)
            prepareUpdate.email = user.email._value;

        if (user.password?._value !== undefined)
            prepareUpdate.password = user.password._value;

        if (user.address?._value !== undefined)
            prepareUpdate.address = user.address._value;

        if (user.token?._value !== undefined)
            prepareUpdate.token = user.token._value;

        if (user.failedAttempts?._value !== undefined)
            prepareUpdate.failedAttempts = user.failedAttempts._value;

        if (user.locked?._value !== undefined)
            prepareUpdate.locked =
                user.locked._value === '0'
                    ? LockedType.LOCKED
                    : LockedType.NOT_LOCKED;

        if (user.dateLocked?._value !== undefined)
            prepareUpdate.dateLocked = user.dateLocked._value;

        if (user.phone?._value !== undefined)
            prepareUpdate.phone = user.phone._value;

        if (user.codePhone?._value !== undefined)
            prepareUpdate.codePhone = user.codePhone._value;

        if (user.status?._value !== undefined)
            prepareUpdate.status =
                user.status._value === '1'
                    ? StatusType.ACTIVE
                    : StatusType.INACTIVE;

        if (user.profilePicture?._value !== undefined)
            prepareUpdate.profilePicture = user.profilePicture._value;

        if (user.country?._id._value !== undefined) {
            const prepareCountry = new CountryEntityMysql();
            prepareCountry._id = user.country._id._value;

            prepareUpdate.country = prepareCountry;
        }

        if (user.state?._id._value !== undefined) {
            const prepareState = new StateEntityMysql();
            prepareState._id = user.state._id._value;

            prepareUpdate.state = prepareState;
        }

        if (user.city?._id._value !== undefined) {
            const prepareCity = new CityEntityMysql();
            prepareCity._id = user.city._id._value;

            prepareUpdate.city = prepareCity;
        }

        if (user.role?._id._value !== undefined) {
            const prepareRole = new RoleEntityMysql();
            prepareRole._id = user.role._id._value;

            prepareUpdate.role = prepareRole;
        }

        await UserEntityMysql.update({ _id: idUser._value }, prepareUpdate);

        const userGetter = await this.getById(idUser);

        if (userGetter == null) throw new Error('');

        return userGetter;
    };

    /**
     * @description update profile user by Id
     * @date 11/12/2023 - 6:36:40 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: UserId, profile: UserProfilePicture) => Promise<void>}
     */
    updateProfileById = async (
        id: UserId,
        profile: UserProfilePicture
    ): Promise<void> => {
        await UserEntityMysql.update(
            { _id: id._value },
            {
                profilePicture: profile._value
            }
        );
    };

    /**
     * @description delete a user by ID
     * @date 11/12/2023 - 7:28:38 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: UserId) => Promise<void>}
     */
    delete = async (id: UserId): Promise<void> => {
        await UserEntityMysql.update(
            { _id: id._value },
            {
                removed: RemovedType.REMOVED,
                status: StatusType.INACTIVE
            }
        );
    };

    /**
     * @description list user by UserName
     * @date 11/11/2023 - 4:47:30 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(username: UserUserName, id: UserId) => Promise<Nullable<User>>}
     */
    getByUserName = async (
        username: UserUserName,
        id: UserId
    ): Promise<Nullable<User>> => {
        const user = await UserEntityMysql.findOne({
            // relations: {
            //     country: true,
            //     state: true,
            //     city: true,
            //     role: true
            // },
            where: {
                userName: username._value,
                removed: RemovedType.NOT_REMOVED,
                _id: Not(id._value)
            }
        });

        if (user === null) return null;

        return User.fromPrimitives(user);
    };

    /**
     * @description list user by identity
     * @date 11/11/2023 - 4:57:34 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(identity: UserIdentity, id: UserId) => Promise<Nullable<User>>}
     */
    getByIdentity = async (
        identity: UserIdentity,
        id: UserId
    ): Promise<Nullable<User>> => {
        const user = await UserEntityMysql.findOne({
            // relations: {
            //     country: true,
            //     state: true,
            //     city: true,
            //     role: true
            // },
            where: {
                identity: identity._value,
                removed: RemovedType.NOT_REMOVED,
                _id: Not(id._value)
            }
        });

        if (user === null) return null;

        return User.fromPrimitives(user);
    };

    /**
     * @description list user by email
     * @date 11/12/2023 - 7:29:01 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(email: UserEmail, id: UserId) => Promise<Nullable<User>>}
     */
    getByEmail = async (
        email: UserEmail,
        id: UserId
    ): Promise<Nullable<User>> => {
        const user = await UserEntityMysql.findOne({
            // relations: {
            //     country: true,
            //     state: true,
            //     city: true,
            //     role: true
            // },
            where: {
                email: email._value,
                removed: RemovedType.NOT_REMOVED,
                _id: Not(id._value)
            }
        });

        if (user === null) return null;

        return User.fromPrimitives(user);
    };

    /**
     * @description list user by phone
     * @date 11/12/2023 - 7:29:29 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(phone: UserPhone, id: UserId) => Promise<Nullable<User>>}
     */
    getByPhone = async (
        phone: UserPhone,
        id: UserId
    ): Promise<Nullable<User>> => {
        const user = await UserEntityMysql.findOne({
            relations: {
                country: true,
                state: true,
                city: true,
                role: true
            },
            where: {
                phone: phone._value,
                removed: RemovedType.NOT_REMOVED,
                _id: Not(id._value)
            }
        });

        if (user === null) return null;

        return User.fromPrimitives(user);
    };
}
