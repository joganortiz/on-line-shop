import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { type Client } from './Client';
import {
    type ClientUserName,
    type ClientId,
    type ClientIdentity,
    type ClientPhone,
    type ClientEmail
} from './value-object';

export interface ClientRepository {
    /**
     * @description list all clients
     * @date 11/18/2023 - 11:56:32 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         start: number,
     *         limit: number
     *     ) => Promise<{ total: number; clients: Client[] }>}
     */
    getAll: (
        start: number,
        limit: number
    ) => Promise<{ total: number; clients: Client[] }>;

    /**
     * @description list client by ID
     * @date 11/18/2023 - 11:57:23 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: ClientId) => Promise<Nullable<Client>>}
     */
    getById: (id: ClientId) => Promise<Nullable<Client>>;

    /**
     * @description Save a client in the database
     * @date 11/18/2023 - 11:57:55 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(client: Client) => Promise<void>}
     */
    save: (client: Client) => Promise<void>;

    /**
     * @description Update client by ID
     * @date 11/18/2023 - 11:58:45 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: ClientId, client: Client) => Promise<void>}
     */
    update: (id: ClientId, client: Client) => Promise<void>;

    /**
     * @description Delete a client by ID
     * @date 11/18/2023 - 11:59:29 AM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: ClientId) => Promise<void>}
     */
    delete: (id: ClientId) => Promise<void>;

    /**
     * @description list client by UserName
     * @date 11/18/2023 - 12:00:19 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         username: ClientUserName,
     *         id: ClientId
     *     ) => Promise<Nullable<Client>>}
     */
    getByUserNameAndIgnoreId: (
        username: ClientUserName,
        id: ClientId
    ) => Promise<Nullable<Client>>;

    /**
     * @description list client by identity
     * @date 11/18/2023 - 12:01:11 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         identity: ClientIdentity,
     *         id: ClientId
     *     ) => Promise<Nullable<Client>>}
     */
    getByIdentityAndIgnoreId: (
        identity: ClientIdentity,
        id: ClientId
    ) => Promise<Nullable<Client>>;

    /**
     * @description list client by email
     * @date 11/18/2023 - 12:07:44 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(email: Client, id: ClientId) => Promise<Nullable<Client>>}
     */
    getByEmailAndIgnoreId: (
        email: ClientEmail,
        id: ClientId
    ) => Promise<Nullable<Client>>;

    /**
     * @description list client by phone
     * @date 11/18/2023 - 12:10:57 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(phone: ClientPhone, id: ClientId) => Promise<Nullable<Client>>}
     */
    getByPhoneAndIgnoreId: (
        phone: ClientPhone,
        id: ClientId
    ) => Promise<Nullable<Client>>;
}
