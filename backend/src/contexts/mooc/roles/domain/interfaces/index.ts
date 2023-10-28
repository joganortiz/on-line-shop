import {
    type RoleCreated,
    type RoleDescription,
    type RoleId,
    type RoleName
} from '../value-objects';

export interface PrimitiveRole {
    _id: string;
    name: string;
    description: string;
    created?: Date;
}

export interface valueObject {
    _id: RoleId;
    name: RoleName;
    description: RoleDescription;
    created?: RoleCreated;
}
