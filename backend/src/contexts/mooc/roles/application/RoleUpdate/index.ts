import { Role, type RoleRepository } from '../../domain';
import { RoleNotFoundException } from '../../domain/exceptions/RoleNotFoundException';
import { type PrimitiveRole } from '../../domain/interfaces';
import { ExistRoleByName } from '../../domain/services/ExistRoleByName';
import { RoleId } from '../../domain/value-objects';

export class RoleUpdateUseCase {
    private readonly _roleRepository: RoleRepository;
    private readonly _existRoleByName: ExistRoleByName;
    constructor(roleRepository: RoleRepository) {
        this._roleRepository = roleRepository;
        this._existRoleByName = new ExistRoleByName(roleRepository);
    }

    run = async (
        id: string,
        {
            name,
            description
        }: {
            name: string;
            description: string;
        }
    ): Promise<PrimitiveRole> => {
        const idRole = new RoleId(id);

        // we validate that the role exists
        const roleExist: Role | null =
            await this._roleRepository.getById(idRole);
        if (roleExist === null) throw new RoleNotFoundException();

        const role = Role.fromPrimitives({
            _id: id,
            name: name ?? roleExist.name._value,
            description: description ?? roleExist.description?._value
        });

        // Validate if a role with the name exists
        await this._existRoleByName.run(role.name._value, role._id._value);

        // If everything goes well we create the new role
        await this._roleRepository.update(role);

        // we consult the updated role
        const roleUpdate = await this._roleRepository.getById(role._id);

        if (roleUpdate === null) throw new RoleNotFoundException();

        return roleUpdate.toPrimitives();
    };
}
