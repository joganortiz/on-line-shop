import { type RoleRepository } from '../../RoleRepository';
import { RoleId, RoleName } from '../../value-objects';

export class ExistRoleByName {
    private readonly _roleRepository: RoleRepository;
    constructor(roleRepository: RoleRepository) {
        this._roleRepository = roleRepository;
    }

    async run(name: string, id: string): Promise<Boolean> {
        const NameRole = new RoleName(name);
        const idRole = new RoleId(id);
        const existRole = await this._roleRepository.getByName(
            NameRole,
            idRole
        );

        if (existRole !== null) {
            return true;
        }

        return false;
    }
}
