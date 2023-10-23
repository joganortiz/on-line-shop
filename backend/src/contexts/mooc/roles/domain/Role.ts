import { RoleCreated, RoleDescription, RoleId, RoleName } from './value-objects';
import { type PrimitiveRole, type listDataValueObjectRole } from './interfaces';
import { ModelRoot } from '@contexts/shared/domain';

export class Role implements ModelRoot<PrimitiveRole> {
    readonly _id: RoleId;
    readonly name: RoleName;
    readonly description?: RoleDescription;
    readonly createDate?: RoleCreated;

    constructor(dataClass: listDataValueObjectRole) {
        this._id = dataClass._id;
        this.name = dataClass.name;
        this.description = dataClass?.description;
        this.createDate = dataClass?.created;
    }

    static fromPrimitives({
        _id,
        name,
        description,
        created
    }: PrimitiveRole): Role {
        return new Role({
            _id: new RoleId(_id),
            name: new RoleName(name),
            description:
                description !== undefined
                    ? new RoleDescription(description)
                    : undefined,
            created: new RoleCreated(created)
        });
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
