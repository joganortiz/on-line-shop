import { type Role } from '../../Role';
import { type RoleRepository } from '../../RoleRepository';
import { RoleNotFoundException } from '../../exceptions/RoleNotFoundException';
import { RoleId } from '../../value-objects';

export class RoleGetterById {
    private readonly _roleRepository: RoleRepository;
    constructor(roleRepository: RoleRepository) {
        this._roleRepository = roleRepository;
    }

    async run(id: string): Promise<Role> {
        const idRole = new RoleId(id);
        const role = await this._roleRepository.getById(idRole);

        if (role === null) {
            throw new RoleNotFoundException();
        }

        return role;
    }
}
