import { ModelRoot } from '@src/contexts/shared/domain';
import { type PrimitiveUser, type valueObjectUser } from './interfaces';
import {
    UserAddress,
    UserCodePhone,
    UserCreated,
    UserEmail,
    UserFailedAttempts,
    UserId,
    UserIdentity,
    UserLastName,
    UserLocked,
    UserName,
    UserPassword,
    UserPhone,
    UserProfilePicture,
    UserStatus,
    UserToken,
    UserUserName,
    UserdateLocked
} from './value-objects';
import { Country } from '../../countries/domain/Country';
import { State } from '../../states/domain/State';
import { City } from '../../cities/domain/City';
import { Role } from '../../roles/domain';

export class User extends ModelRoot<PrimitiveUser> {
    readonly _id: UserId;
    readonly name: UserName;
    readonly lastName: UserLastName;
    readonly userName: UserUserName;
    readonly identity?: UserIdentity;
    readonly email: UserEmail;
    readonly password: UserPassword;
    readonly address?: UserAddress;
    readonly token?: UserToken;
    readonly failedAttempts?: UserFailedAttempts;
    readonly locked?: UserLocked;
    readonly dateLocked?: UserdateLocked;
    readonly phone?: UserPhone;
    readonly codePhone?: UserCodePhone;
    readonly status: UserStatus;
    readonly profilePicture?: UserProfilePicture;
    readonly created?: UserCreated;
    readonly country?: Country;
    readonly state?: State;
    readonly city?: City;
    readonly role: Role;

    constructor(dataClass: valueObjectUser) {
        super();
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
        this.role = dataClass.role;
    }

    static create(dataPrimitive: PrimitiveUser): User {
        const user: valueObjectUser = {
            _id: new UserId(dataPrimitive._id),
            name: new UserName(dataPrimitive.name),
            lastName: new UserLastName(dataPrimitive.lastName),
            userName: new UserUserName(dataPrimitive.userName),
            identity: new UserIdentity(dataPrimitive.identity),
            email: new UserEmail(dataPrimitive.email),
            address: new UserAddress(dataPrimitive.address),
            locked: new UserLocked(dataPrimitive.locked),
            dateLocked: new UserdateLocked(dataPrimitive.dateLocked),
            phone: new UserPhone(dataPrimitive.phone),
            codePhone: new UserCodePhone(dataPrimitive.codePhone),
            status: new UserStatus(dataPrimitive.status),
            created: new UserCreated(dataPrimitive?.created),
            role: Role.fromPrimitives(dataPrimitive.role),
            password: new UserPassword(dataPrimitive.password),
            token: new UserToken(dataPrimitive.token),
            failedAttempts: new UserFailedAttempts(
                dataPrimitive?.failedAttempts
            ),
            profilePicture: new UserProfilePicture(dataPrimitive.profilePicture)
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

        return new User(user);
    }

    static fromPrimitives(dataPrimitive: PrimitiveUser): User {
        const primitive: valueObjectUser = {} as valueObjectUser;

        primitive._id = new UserId(dataPrimitive._id);
        if (dataPrimitive.userName !== undefined)
            primitive.userName = new UserUserName(dataPrimitive.userName);
        if (dataPrimitive.lastName !== undefined)
            primitive.lastName = new UserLastName(dataPrimitive.lastName);
        if (dataPrimitive.name !== undefined)
            primitive.name = new UserName(dataPrimitive.name);
        if (dataPrimitive.identity !== undefined)
            primitive.identity = new UserIdentity(dataPrimitive.identity);
        if (dataPrimitive.email !== undefined)
            primitive.email = new UserEmail(dataPrimitive.email);
        if (dataPrimitive.password !== undefined)
            primitive.password = new UserPassword(dataPrimitive.password);
        if (dataPrimitive.address !== undefined)
            primitive.address = new UserAddress(dataPrimitive.address);
        if (dataPrimitive.locked !== undefined)
            primitive.locked = new UserLocked(dataPrimitive.locked);
        if (dataPrimitive.dateLocked !== undefined)
            primitive.dateLocked = new UserdateLocked(dataPrimitive.dateLocked);
        if (dataPrimitive.phone !== undefined)
            primitive.phone = new UserPhone(dataPrimitive.phone);
        if (dataPrimitive.codePhone !== undefined)
            primitive.codePhone = new UserCodePhone(dataPrimitive.codePhone);
        if (dataPrimitive.status !== undefined)
            primitive.status = new UserStatus(dataPrimitive.status);
        if (dataPrimitive.created !== undefined)
            primitive.created = new UserCreated(dataPrimitive.created);
        if (dataPrimitive.role !== undefined)
            primitive.role = Role.fromPrimitives(dataPrimitive.role);
        if (dataPrimitive.token !== undefined)
            primitive.token = new UserToken(dataPrimitive.token);
        if (dataPrimitive.failedAttempts !== undefined)
            primitive.failedAttempts = new UserFailedAttempts(
                dataPrimitive.failedAttempts
            );
        if (dataPrimitive.profilePicture !== undefined)
            primitive.profilePicture = new UserProfilePicture(
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

        return new User(primitive);
    }

    toPrimitives(): PrimitiveUser {
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
            role: this.role.toPrimitives()
        };
    }
}
