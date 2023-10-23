import { Role, RoleRepository } from "../../domain";
import { PrimitiveRole } from "../../domain/interfaces";

export class RoleGetterAllUseCase {
    private readonly _roleRepository: RoleRepository;
    constructor(roleRepository: RoleRepository) {
        this._roleRepository = roleRepository;
    }

    run = async (): Promise<{total: number; data: PrimitiveRole[]}> => {
        const result = await this._roleRepository.getAll();
        const resultDataPrimitives = result.roles.map((role: Role) =>
            role.toPrimitives()
        );

        return {
            total: result.total,
            data: resultDataPrimitives
        };
    };
}
