import { type Country } from '@src/contexts/mooc/countries/domain/Country';
import {
    type UserToken,
    type UserAddress,
    type UserEmail,
    type UserId,
    type UserIdentity,
    type UserLastName,
    type UserName,
    type UserPassword,
    type UserUserName,
    type UserFailedAttempts,
    type UserLocked,
    type UserdateLocked,
    type UserPhone,
    type UserCodePhone,
    type UserStatus,
    type UserProfilePicture,
    type UserCreated
} from '../value-objects';
import { type State } from '@src/contexts/mooc/states/domain/State';
import { type City } from '@src/contexts/mooc/cities/domain/City';
import { type Role } from '@src/contexts/mooc/roles/domain';
import { type PrimitiveCountry } from '@src/contexts/mooc/countries/domain/interfaces';
import { type PrimitiveState } from '@src/contexts/mooc/states/domain/interfaces';
import { type PrimitiveCity } from '@src/contexts/mooc/cities/domain/interfaces';
import { type PrimitiveRole } from '@src/contexts/mooc/roles/domain/interfaces';

export interface PrimitiveUser {
    _id: string;
    name: string;
    lastName: string;
    userName: string;
    identity?: string;
    email: string;
    password: string;
    country?: PrimitiveCountry;
    state?: PrimitiveState;
    city?: PrimitiveCity;
    address?: string;
    token?: string;
    failedAttempts?: number;
    locked?: string;
    dateLocked?: Date;
    phone?: string;
    codePhone?: string;
    status: string;
    profilePicture?: string;
    created?: Date;
    role: PrimitiveRole;
}

export interface valueObject {
    _id: UserId;
    name: UserName;
    lastName: UserLastName;
    userName: UserUserName;
    identity?: UserIdentity;
    email: UserEmail;
    password: UserPassword;
    country?: Country;
    state?: State;
    city?: City;
    address?: UserAddress;
    token?: UserToken;
    failedAttempts?: UserFailedAttempts;
    locked?: UserLocked;
    dateLocked?: UserdateLocked;
    phone?: UserPhone;
    codePhone?: UserCodePhone;
    status: UserStatus;
    profilePicture?: UserProfilePicture;
    created?: UserCreated;
    role: Role;
}
