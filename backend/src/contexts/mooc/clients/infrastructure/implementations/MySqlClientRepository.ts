import {
    LockedType,
    RemovedType,
    StatusType
} from '@src/contexts/shared/domain/typeOrm';
import { Client } from '../../domain/Client';
import { type ClientRepository } from '../../domain/ClientRepository';
import { ClientEntityMysql } from '../persistence/typeorm';
import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import {
    type ClientEmail,
    type ClientId,
    type ClientIdentity,
    type ClientPhone,
    type ClientUserName
} from '../../domain/value-object';
import { CountryEntityMysql } from '@src/contexts/mooc/countries/infrastructure/persistence/typeorm';
import { StateEntityMysql } from '@src/contexts/mooc/states/infrastructure/persistence/typeorm';
import { CityEntityMysql } from '@src/contexts/mooc/cities/infrastructure/persistence/typeorm';
import { RoleEntityMysql } from '@src/contexts/mooc/roles/infrastructure/persistence/typeorm';
import { Not } from 'typeorm';

export class MySqlClientRepository implements ClientRepository {
    /**
     * @description list all clients
     * @date 11/18/2023 - 1:46:52 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start: number, limit: number) => Promise<{ total: number; clients: {}; }>}
     */
    getAll = async (
        start: number,
        limit: number
    ): Promise<{ total: number; clients: Client[] }> => {
        const limitQuery: { skip?: number; take?: number } = {
            skip: undefined,
            take: undefined
        };

        if (limit !== undefined && limit > 0) {
            limitQuery.skip = start;
            limitQuery.take = limit;
        }

        const items = await ClientEntityMysql.find({
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
                }
            },
            relations: {
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

        const total = await ClientEntityMysql.count({
            where: {
                removed: RemovedType.NOT_REMOVED
            }
        });

        const clients = items.map((item) => {
            return Client.fromPrimitives(item);
        });

        return { total, clients };
    };

    /**
     * @description list client by ID
     * @date 11/18/2023 - 1:47:10 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: ClientId) => Promise<Nullable<Client>>}
     */
    getById = async (id: ClientId): Promise<Nullable<Client>> => {
        const client = await ClientEntityMysql.findOne({
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
                }
            },
            relations: {
                country: true,
                state: true,
                city: true
            },
            where: {
                _id: id._value,
                removed: RemovedType.NOT_REMOVED
            }
        });

        if (client === null) return null;

        return Client.fromPrimitives(client);
    };

    /**
     * @description Save a client in the database
     * @date 11/18/2023 - 1:47:22 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(client: Client) => Promise<void>}
     */
    save = async (client: Client): Promise<void> => {
        const prepareClient = new ClientEntityMysql();

        prepareClient._id = client._id._value;
        prepareClient.userName = client.userName._value;
        prepareClient.name = client.name._value;
        prepareClient.lastName = client.lastName._value;
        prepareClient.email = client.email._value;
        prepareClient.identity = client.identity?._value;
        prepareClient.password = client.password._value;
        prepareClient.address = client.address?._value;
        prepareClient.phone = client.phone?._value;
        prepareClient.codePhone = client.codePhone?._value;
        prepareClient.status =
            client.status._value === '1'
                ? StatusType.ACTIVE
                : StatusType.INACTIVE;

        if (client.country !== undefined) {
            const prepareCountry = new CountryEntityMysql();
            prepareCountry._id = client.country._id._value;

            prepareClient.country = prepareCountry;
        }

        if (client.state !== undefined) {
            const prepareState = new StateEntityMysql();
            prepareState._id = client.state._id._value;

            prepareClient.state = prepareState;
        }

        if (client.city !== undefined) {
            const prepareCity = new CityEntityMysql();
            prepareCity._id = client.city._id._value;

            prepareClient.city = prepareCity;
        }

        const prepareRole = new RoleEntityMysql();
        prepareRole._id = '0b207cdc-7c4f-11ee-a11e-0242ac180002';

        prepareClient.role = prepareRole;

        await prepareClient.save();
    };

    /**
     * @description Update client by ID
     * @date 11/18/2023 - 1:47:39 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: ClientId, client: Client) => Promise<void>}
     */
    update = async (id: ClientId, client: Client): Promise<void> => {
        const prepareUpdate = new ClientEntityMysql();

        if (client.userName?._value !== undefined)
            prepareUpdate.userName = client.userName._value;

        if (client.name?._value !== undefined)
            prepareUpdate.name = client.name._value;

        if (client.lastName?._value !== undefined)
            prepareUpdate.lastName = client.lastName._value;

        if (client.identity?._value !== undefined)
            prepareUpdate.identity = client.identity._value;

        if (client.email?._value !== undefined)
            prepareUpdate.email = client.email._value;

        if (client.password?._value !== undefined)
            prepareUpdate.password = client.password._value;

        if (client.address?._value !== undefined)
            prepareUpdate.address = client.address._value;

        if (client.token?._value !== undefined)
            prepareUpdate.token = client.token._value;

        if (client.failedAttempts?._value !== undefined)
            prepareUpdate.failedAttempts = client.failedAttempts._value;

        if (client.locked?._value !== undefined)
            prepareUpdate.locked =
                client.locked._value === '0'
                    ? LockedType.LOCKED
                    : LockedType.NOT_LOCKED;

        if (client.dateLocked?._value !== undefined)
            prepareUpdate.dateLocked = client.dateLocked._value;

        if (client.phone?._value !== undefined)
            prepareUpdate.phone = client.phone._value;

        if (client.codePhone?._value !== undefined)
            prepareUpdate.codePhone = client.codePhone._value;

        if (client.status?._value !== undefined)
            prepareUpdate.status =
                client.status._value === '1'
                    ? StatusType.ACTIVE
                    : StatusType.INACTIVE;

        if (client.profilePicture?._value !== undefined)
            prepareUpdate.profilePicture = client.profilePicture._value;

        if (client.country?._id._value !== undefined) {
            const prepareCountry = new CountryEntityMysql();
            prepareCountry._id = client.country._id._value;

            prepareUpdate.country = prepareCountry;
        }

        if (client.state?._id._value !== undefined) {
            const prepareState = new StateEntityMysql();
            prepareState._id = client.state._id._value;

            prepareUpdate.state = prepareState;
        }

        if (client.city?._id._value !== undefined) {
            const prepareCity = new CityEntityMysql();
            prepareCity._id = client.city._id._value;

            prepareUpdate.city = prepareCity;
        }

        await ClientEntityMysql.update({ _id: id._value }, prepareUpdate);
    };

    /**
     * @description Delete a client by ID
     * @date 11/18/2023 - 1:48:01 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: ClientId) => Promise<void>}
     */
    delete = async (id: ClientId): Promise<void> => {
        await ClientEntityMysql.update(
            { _id: id._value },
            {
                removed: RemovedType.REMOVED,
                status: StatusType.INACTIVE
            }
        );
    };

    /**
     * @description list client by email
     * @date 11/18/2023 - 1:46:10 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(email: ClientEmail, id: ClientId) => Promise<Nullable<Client>>}
     */
    getByEmailAndIgnoreId = async (
        email: ClientEmail,
        id: ClientId
    ): Promise<Nullable<Client>> => {
        const client = await ClientEntityMysql.findOne({
            where: {
                email: email._value,
                removed: RemovedType.NOT_REMOVED,
                _id: Not(id._value)
            }
        });

        if (client === null) return null;

        return Client.fromPrimitives(client);
    };

    /**
     * @description list client by identity
     * @date 11/18/2023 - 1:46:26 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(identity: ClientIdentity, id: ClientId) => Promise<Nullable<Client>>}
     */
    getByIdentityAndIgnoreId = async (
        identity: ClientIdentity,
        id: ClientId
    ): Promise<Nullable<Client>> => {
        const client = await ClientEntityMysql.findOne({
            where: {
                identity: identity._value,
                removed: RemovedType.NOT_REMOVED,
                _id: Not(id._value)
            }
        });

        if (client === null) return null;

        return Client.fromPrimitives(client);
    };

    /**
     * @description list client by phone
     * @date 11/18/2023 - 1:45:53 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(phone: ClientPhone, id: ClientId) => Promise<Nullable<Client>>}
     */
    getByPhoneAndIgnoreId = async (
        phone: ClientPhone,
        id: ClientId
    ): Promise<Nullable<Client>> => {
        const client = await ClientEntityMysql.findOne({
            where: {
                phone: phone._value,
                removed: RemovedType.NOT_REMOVED,
                _id: Not(id._value)
            }
        });

        if (client === null) return null;

        return Client.fromPrimitives(client);
    };

    /**
     * @description list client by UserName
     * @date 11/18/2023 - 1:46:42 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(username: ClientUserName, id: ClientId) => Promise<Nullable<Client>>}
     */
    getByUserNameAndIgnoreId = async (
        username: ClientUserName,
        id: ClientId
    ): Promise<Nullable<Client>> => {
        const client = await ClientEntityMysql.findOne({
            where: {
                userName: username._value,
                removed: RemovedType.NOT_REMOVED,
                _id: Not(id._value)
            }
        });

        if (client === null) return null;

        return Client.fromPrimitives(client);
    };
}
