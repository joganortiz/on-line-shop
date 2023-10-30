import { ModelRoot } from '@src/contexts/shared/domain';
import {
    type PrimitivePermission,
    type valueObjectPermission
} from './interfaces';
import {
    PermissionCreate,
    PermissionDelete,
    PermissionId,
    PermissionRead,
    PermissionUpdate
} from './value-objects';
import { Role } from '../../roles/domain';
import { SubModule } from '../../subModule/domain/SubModule';

export class Permission extends ModelRoot<PrimitivePermission> {
    readonly id: PermissionId;
    readonly create: PermissionCreate;
    readonly read: PermissionRead;
    readonly update: PermissionUpdate;
    readonly delete: PermissionDelete;
    readonly role: Role;
    readonly subModule: SubModule;

    constructor(dataClass: valueObjectPermission) {
        super();
        this.id = dataClass.id;
        this.create = dataClass.create;
        this.read = dataClass.read;
        this.update = dataClass.update;
        this.delete = dataClass.delete;
        this.role = dataClass.role;
        this.subModule = dataClass.subModule;
    }

    static fromPrimitives(data: PrimitivePermission): Permission {
        return new Permission({
            id: new PermissionId(data._id),
            create: new PermissionCreate(data.create),
            read: new PermissionRead(data.read),
            update: new PermissionUpdate(data.update),
            delete: new PermissionDelete(data.delete),
            role: Role.fromPrimitives(data.role),
            subModule: SubModule.fromPrimitives(data.subModule)
        });
    }

    toPrimitives(): PrimitivePermission {
        return {
            _id: this.id._value,
            create: this.create._value,
            read: this.read._value,
            update: this.update._value,
            delete: this.delete?._value,
            role: this.role?.toPrimitives(),
            subModule: this.subModule.toPrimitives()
        };
    }
}
