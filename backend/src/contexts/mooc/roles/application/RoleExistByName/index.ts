import { type UuidRepository } from '@contexts/shared/domain/plugins/UuidRepository';
import { type Role, type RoleRepository } from '../../domain';
import { RoleId, RoleName } from '../../domain/value-objects';

export class RoleExistByNameUseCase {
    private readonly _roleRepository: RoleRepository;
    private readonly _uuidV4: UuidRepository;
    constructor(roleRepository: RoleRepository, uuidV4: UuidRepository) {
        this._roleRepository = roleRepository;
        this._uuidV4 = uuidV4;
    }

    run = async (name: string, id?: string): Promise<boolean> => {
        const roleName = new RoleName(name);
        const roleId = new RoleId(id ?? (await this._uuidV4.generate()));
        const result: Role | null = await this._roleRepository.getByName(
            roleName,
            roleId
        );

        if (result === null) return false;

        return true;
    };
}
