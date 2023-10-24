import { RemovedType } from "@contexts/shared/domain/typeOrm";
import { Role, RoleRepository } from "../../domain";
import { RoleEntityMysql } from "../persistence/typeorm";

export class MySqlRoleRepository implements RoleRepository {

    /**
     * @description list all roles
     * @date 10/23/2023 - 7:23:49 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<{ total: number; roles: {}; }>}
     */
    getAll = async (start?: number, limit?: number): Promise<{total: number; roles: Role[]}> => {
        const limitQuery: {skip?: number; take?: number} = {skip: undefined, take: undefined};

        if (limit && limit > 0) {
            limitQuery.skip = start;
            limitQuery.take = limit;
        }

        const items = await RoleEntityMysql.find({
            select: {
                _id: true,
                name: true,
                description: true,
                created: true
            },
            where: {
                removed: RemovedType.NOT_REMOVED
            },
            order: {
                name: 'ASC'
            },
            ...limitQuery
        });

        const total = await RoleEntityMysql.count({
            where: {
                removed: RemovedType.NOT_REMOVED
            },
        });

        const roles = items.map((item) => {
            return Role.fromPrimitives(item);
        });

        return {
            total,
            roles
        };
    };
}
