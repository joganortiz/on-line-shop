import {
    RoleCreated,
    RoleDescription,
    RoleId,
    RoleName
} from './value-objects';
import { type PrimitiveRole, type valueObject } from './interfaces';
import { type ModelRoot } from '@contexts/shared/domain';

export class Role implements ModelRoot<PrimitiveRole> {
    readonly _id: RoleId;
    readonly name: RoleName;
    readonly description: RoleDescription;
    readonly createDate?: RoleCreated;

    constructor({ _id, name, description, created }: valueObject) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.createDate = created;
    }

    static fromPrimitives({
        _id,
        name,
        description,
        created
    }: PrimitiveRole): Role {
        const role: valueObject = {} as valueObject;

        role._id = new RoleId(_id);
        role.name = new RoleName(name);
        if (description !== undefined)
            role.description = new RoleDescription(description);
        if (created !== undefined) role.created = new RoleCreated(created);
        return new Role(role);
    }

    toPrimitives(): PrimitiveRole {
        return {
            _id: this._id._value,
            name: this.name._value,
            description: this.description?._value,
            created: this.createDate?._value
        };
    }
}
