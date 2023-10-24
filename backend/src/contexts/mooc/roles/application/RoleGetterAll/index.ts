import { Role, RoleRepository } from "../../domain";
import { PrimitiveRole } from "../../domain/interfaces";

export class RoleGetterAllUseCase {
    private readonly _roleRepository: RoleRepository;
    constructor(roleRepository: RoleRepository) {
        this._roleRepository = roleRepository;
    }

    run = async ({start, limit}: {start?: string; limit?: string}): Promise<{total: number; data: PrimitiveRole[]}> => {
        start = (start) ? start : '0';
        limit = (limit) ? limit : '0';

        const result = await this._roleRepository.getAll(parseInt(start) ?? 0, parseInt(limit) ?? 0);
        const resultDataPrimitives = result.roles.map((role: Role) =>
            role.toPrimitives()
        );

        return {
            total: result.total,
            data: resultDataPrimitives
        };
    };
}
