import { type SubModule } from '../../SubModule';
import { type SubModuleRepository } from '../../SubModuleRepository';
import { SubModuleNotFoundException } from '../../exceptions/SubModuleNotFoundException';
import { SubModuleId } from '../../value-objects';

export class ExistSubModuleById {
    private readonly _subModuleRepository: SubModuleRepository;
    constructor(roleRepository: SubModuleRepository) {
        this._subModuleRepository = roleRepository;
    }

    async run(id: string): Promise<SubModule> {
        const idRole = new SubModuleId(id);
        const role = await this._subModuleRepository.getSubModuleById(idRole);

        if (role === null) {
            throw new SubModuleNotFoundException(idRole._value);
        }

        return role;
    }
}
