import { type ModelRoot } from '@src/contexts/shared/domain';
import {
    ClientId,
    ClientAddress,
    ClientCodePhone,
    ClientCreated,
    ClientDateLocked,
    ClientEmail,
    ClientFailedAttempts,
    ClientIdentity,
    ClientLastName,
    ClientLocked,
    ClientName,
    ClientPassword,
    ClientPhone,
    ClientProfilePicture,
    ClientStatus,
    ClientToken,
    ClientUserName
} from './value-object';
import { Country } from '../../countries/domain/Country';
import { State } from '../../states/domain/State';
import { City } from '../../cities/domain/City';
import { Role } from '../../roles/domain';
import { type PrimitiveClient, type valueObjectClient } from './interfaces';

export class Client implements ModelRoot<PrimitiveClient> {
    readonly _id: ClientId;
    readonly name: ClientName;
    readonly lastName: ClientLastName;
    readonly userName: ClientUserName;
    readonly identity?: ClientIdentity;
    readonly email: ClientEmail;
    readonly password: ClientPassword;
    readonly address?: ClientAddress;
    readonly token?: ClientToken;
    readonly failedAttempts?: ClientFailedAttempts;
    readonly locked?: ClientLocked;
    readonly dateLocked?: ClientDateLocked;
    readonly phone?: ClientPhone;
    readonly codePhone?: ClientCodePhone;
    readonly status: ClientStatus;
    readonly profilePicture?: ClientProfilePicture;
    readonly created?: ClientCreated;
    readonly country?: Country;
    readonly state?: State;
    readonly city?: City;
    readonly role?: Role;

    constructor(dataClass: valueObjectClient) {
        this._id = dataClass._id;
        this.name = dataClass.name;
        this.lastName = dataClass.lastName;
        this.userName = dataClass.userName;
        this.identity = dataClass.identity;
        this.email = dataClass.email;
        this.password = dataClass.password;
        this.address = dataClass.address;
        this.token = dataClass.token;
        this.failedAttempts = dataClass.failedAttempts;
        this.locked = dataClass.locked;
        this.dateLocked = dataClass.dateLocked;
        this.phone = dataClass.phone;
        this.codePhone = dataClass.codePhone;
        this.status = dataClass.status;
        this.profilePicture = dataClass.profilePicture;
        this.created = dataClass.created;
        this.country = dataClass.country;
        this.state = dataClass.state;
        this.city = dataClass.city;
        this.role = dataClass?.role;
    }

    static create(dataPrimitive: PrimitiveClient): Client {
        const user: valueObjectClient = {
            _id: new ClientId(dataPrimitive._id),
            name: new ClientName(dataPrimitive.name),
            lastName: new ClientLastName(dataPrimitive.lastName),
            userName: new ClientUserName(dataPrimitive.userName),
            identity: new ClientIdentity(dataPrimitive.identity),
            email: new ClientEmail(dataPrimitive.email),
            address: new ClientAddress(dataPrimitive.address),
            locked: new ClientLocked(dataPrimitive.locked),
            dateLocked: new ClientDateLocked(dataPrimitive.dateLocked),
            phone: new ClientPhone(dataPrimitive.phone),
            codePhone: new ClientCodePhone(dataPrimitive.codePhone),
            status: new ClientStatus(dataPrimitive.status),
            created: new ClientCreated(dataPrimitive?.created),
            password: new ClientPassword(dataPrimitive.password),
            token: new ClientToken(dataPrimitive.token),
            failedAttempts: new ClientFailedAttempts(
                dataPrimitive?.failedAttempts
            ),
            profilePicture: new ClientProfilePicture(
                dataPrimitive.profilePicture
            )
        };

        if (
            dataPrimitive.country !== undefined &&
            dataPrimitive.country !== null
        ) {
            user.country = Country.fromPrimitives(dataPrimitive.country);
        }

        if (dataPrimitive.state !== undefined && dataPrimitive.state !== null) {
            user.state = State.fromPrimitives(dataPrimitive.state);
        }

        if (dataPrimitive.city !== undefined && dataPrimitive.city !== null) {
            user.city = City.fromPrimitives(dataPrimitive.city);
        }

        return new Client(user);
    }

    static fromPrimitives(dataPrimitive: PrimitiveClient): Client {
        const primitive: valueObjectClient = {} as valueObjectClient;

        primitive._id = new ClientId(dataPrimitive._id);
        if (dataPrimitive.userName !== undefined)
            primitive.userName = new ClientUserName(dataPrimitive.userName);
        if (dataPrimitive.lastName !== undefined)
            primitive.lastName = new ClientLastName(dataPrimitive.lastName);
        if (dataPrimitive.name !== undefined)
            primitive.name = new ClientName(dataPrimitive.name);
        if (dataPrimitive.identity !== undefined)
            primitive.identity = new ClientIdentity(dataPrimitive.identity);
        if (dataPrimitive.email !== undefined)
            primitive.email = new ClientEmail(dataPrimitive.email);
        if (dataPrimitive.password !== undefined) {
            primitive.password = new ClientPassword(dataPrimitive.password);
        }
        if (dataPrimitive.address !== undefined)
            primitive.address = new ClientAddress(dataPrimitive.address);
        if (dataPrimitive.locked !== undefined)
            primitive.locked = new ClientLocked(dataPrimitive.locked);
        if (dataPrimitive.dateLocked !== undefined)
            primitive.dateLocked = new ClientDateLocked(
                dataPrimitive.dateLocked
            );
        if (dataPrimitive.phone !== undefined)
            primitive.phone = new ClientPhone(dataPrimitive.phone);
        if (dataPrimitive.codePhone !== undefined)
            primitive.codePhone = new ClientCodePhone(dataPrimitive.codePhone);
        if (dataPrimitive.status !== undefined)
            primitive.status = new ClientStatus(dataPrimitive.status);
        if (dataPrimitive.created !== undefined)
            primitive.created = new ClientCreated(dataPrimitive.created);
        if (dataPrimitive.role !== undefined)
            primitive.role = Role.fromPrimitives(dataPrimitive.role);
        if (dataPrimitive.token !== undefined)
            primitive.token = new ClientToken(dataPrimitive.token);
        if (dataPrimitive.failedAttempts !== undefined)
            primitive.failedAttempts = new ClientFailedAttempts(
                dataPrimitive.failedAttempts
            );
        if (dataPrimitive.profilePicture !== undefined)
            primitive.profilePicture = new ClientProfilePicture(
                dataPrimitive.profilePicture
            );
        if (
            dataPrimitive.country !== undefined &&
            dataPrimitive.country !== null
        ) {
            primitive.country = Country.fromPrimitives(dataPrimitive.country);
        }

        if (dataPrimitive.state !== undefined && dataPrimitive.state !== null) {
            primitive.state = State.fromPrimitives(dataPrimitive.state);
        }

        if (dataPrimitive.city !== undefined && dataPrimitive.city !== null) {
            primitive.city = City.fromPrimitives(dataPrimitive.city);
        }

        return new Client(primitive);
    }

    toPrimitives(): PrimitiveClient {
        return {
            _id: this._id._value,
            name: this.name._value,
            lastName: this.lastName?._value,
            userName: this.userName?._value,
            identity: this.identity?._value,
            email: this.email?._value,
            password: this.password?._value,
            address: this.address?._value,
            token: this.token?._value,
            failedAttempts: this.failedAttempts?._value,
            locked: this.locked?._value,
            dateLocked: this.dateLocked?._value,
            phone: this.phone?._value,
            codePhone: this.codePhone?._value,
            status: this.status?._value,
            profilePicture: this.profilePicture?._value,
            created: this.created?._value,
            country: this.country?.toPrimitives(),
            state: this.state?.toPrimitives(),
            city: this.city?.toPrimitives(),
            role: this.role?.toPrimitives()
        };
    }
}
