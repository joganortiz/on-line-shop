import { type RoleRepository } from '../../domain';
import { AdministratorNotDeleteException } from '../../domain/exceptions/AdministratorNotDeleteException';
import { RoleCouldNotBeDeletedeException } from '../../domain/exceptions/RoleCouldNotBeDeletedeException';
import { type PrimitiveRole } from '../../domain/interfaces';
import { RoleGetterById } from '../../domain/services/RoleGetterById';

export class RoleDeleteUseCase {
    private readonly _roleRepository: RoleRepository;
    private readonly _roleGetterById: RoleGetterById;
    constructor(roleRepository: RoleRepository) {
        this._roleRepository = roleRepository;
        this._roleGetterById = new RoleGetterById(roleRepository);
    }

    run = async (id: string): Promise<PrimitiveRole> => {
        if (id === '4653992a-5d55-11ed-aa8a-00e04c360ad5') {
            throw new AdministratorNotDeleteException();
        }

        const roleToDelete = await this._roleGetterById.run(id);

        // if the role exists we proceed to delete it
        const result = await this._roleRepository.delete(roleToDelete);

        if (!result) {
            throw new RoleCouldNotBeDeletedeException();
        }

        return roleToDelete.toPrimitives();
    };
}
