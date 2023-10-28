import { type Nullable } from '@contexts/shared/domain/Nullable';
import { type Role, type RoleRepository } from '../../domain';
import { type PrimitiveRole } from '../../domain/interfaces';
import { RoleId } from '../../domain/value-objects';
import { RoleNotFoundException } from '../../domain/exceptions/RoleNotFoundException';

export class RoleGetterByIdUseCase {
    private readonly _roleRepository: RoleRepository;
    constructor(roleRepository: RoleRepository) {
        this._roleRepository = roleRepository;
    }

    run = async (id: string): Promise<PrimitiveRole> => {
        const idRole = new RoleId(id);
        const result: Nullable<Role> =
            await this._roleRepository.getById(idRole);

        if (result === null) {
            throw new RoleNotFoundException();
        }

        const resultDataPrimitives = result.toPrimitives();

        return resultDataPrimitives;
    };
}
