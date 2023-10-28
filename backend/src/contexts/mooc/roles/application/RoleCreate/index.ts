import { Role, type RoleRepository } from '../../domain';
import { RoleDescription, RoleId, RoleName } from '../../domain/value-objects';
import { type PrimitiveRole } from '../../domain/interfaces';
import { ExistRoleByName } from '../../domain/services/ExistRoleByName';
import { ExistByNameException } from '../../domain/exceptions/ExistByNameException';
import { type UuidRepository } from '@contexts/shared/domain/plugins/UuidRepository';

export class RoleCreateUseCase {
    private readonly _roleRepository: RoleRepository;
    private readonly _existRoleByName: ExistRoleByName;
    private readonly _uuidGenerator: UuidRepository;
    constructor(roleRepository: RoleRepository, uuid: UuidRepository) {
        this._roleRepository = roleRepository;
        this._existRoleByName = new ExistRoleByName(roleRepository);
        this._uuidGenerator = uuid;
    }

    run = async ({
        name,
        description
    }: {
        name: string;
        description: string;
    }): Promise<PrimitiveRole> => {
        const role = new Role({
            _id: new RoleId(await this._uuidGenerator.generate()),
            name: new RoleName(name),
            description: new RoleDescription(description)
        });

        // Validate if a role with the name exists
        const existRoleByName = await this._existRoleByName.run(
            role.name._value,
            role._id._value
        );

        if (existRoleByName) throw new ExistByNameException();

        // If everything goes well we create the new role
        const roleCreate = await this._roleRepository.save(role);

        return roleCreate.toPrimitives();
    };
}
