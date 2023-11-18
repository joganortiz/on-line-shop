import { type PrimitiveCity } from '@src/contexts/mooc/cities/domain/interfaces';
import { type PrimitiveCountry } from '@src/contexts/mooc/countries/domain/interfaces';
import { type PrimitiveRole } from '@src/contexts/mooc/roles/domain/interfaces';
import { type PrimitiveState } from '@src/contexts/mooc/states/domain/interfaces';
import {
    type ClientAddress,
    type ClientCodePhone,
    type ClientCreated,
    type ClientDateLocked,
    type ClientEmail,
    type ClientFailedAttempts,
    type ClientId,
    type ClientIdentity,
    type ClientLastName,
    type ClientLocked,
    type ClientName,
    type ClientPassword,
    type ClientPhone,
    type ClientProfilePicture,
    type ClientStatus,
    type ClientToken,
    type ClientUserName
} from '../value-object';
import { type Country } from '@src/contexts/mooc/countries/domain/Country';
import { type State } from '@src/contexts/mooc/states/domain/State';
import { type City } from '@src/contexts/mooc/cities/domain/City';
import { type Role } from '@src/contexts/mooc/roles/domain';
import type fileUpload from 'express-fileupload';

export interface PrimitiveClient {
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
    role?: PrimitiveRole;
}

export interface valueObjectClient {
    _id: ClientId;
    name: ClientName;
    lastName: ClientLastName;
    userName: ClientUserName;
    identity?: ClientIdentity;
    email: ClientEmail;
    password: ClientPassword;
    country?: Country;
    state?: State;
    city?: City;
    address?: ClientAddress;
    token?: ClientToken;
    failedAttempts?: ClientFailedAttempts;
    locked?: ClientLocked;
    dateLocked?: ClientDateLocked;
    phone?: ClientPhone;
    codePhone?: ClientCodePhone;
    status: ClientStatus;
    profilePicture?: ClientProfilePicture;
    created?: ClientCreated;
    role?: Role;
}

export interface ClientCommand {
    name: string;
    lastName: string;
    userName: string;
    identity: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    codePhone: string;
    status: string;
    country: string;
    state: string;
    city: string;
    idRole: string;
    img?: fileUpload.UploadedFile;
}
