import { type PrimitiveRole } from '@src/contexts/mooc/roles/domain/interfaces';
import { type PrimitiveSubModule } from '@src/contexts/mooc/subModule/domain/interfaces';
import { type Role } from '@src/contexts/mooc/roles/domain';
import { type SubModule } from '@src/contexts/mooc/subModule/domain/SubModule';
import {
    type PermissionCreate,
    type PermissionDelete,
    type PermissionId,
    type PermissionRead,
    type PermissionUpdate
} from '../value-objects';

export interface PrimitivePermission {
    _id: string;
    create: string;
    read: string;
    update: string;
    delete: string;
    role: PrimitiveRole;
    subModule: PrimitiveSubModule;
}

export interface valueObjectPermission {
    id: PermissionId;
    create: PermissionCreate;
    read: PermissionRead;
    update: PermissionUpdate;
    delete: PermissionDelete;
    role: Role;
    subModule: SubModule;
}
