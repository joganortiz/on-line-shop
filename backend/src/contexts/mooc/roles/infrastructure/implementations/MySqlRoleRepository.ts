import { RemovedType } from "@contexts/shared/domain/typeOrm";
import { Role, RoleRepository } from "../../domain";
import { RoleEntityMysql } from "../persistence/typeorm";
import { RoleId } from "../../domain/value-objects";
import { Nullable } from "@contexts/shared/domain/Nullable";

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

    /**
     * @description get the detail of a role by id
     * @date 10/24/2023 - 10:01:38 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: RoleId) => Promise<Nullable<Role>>}
     */
    getById = async (id: RoleId): Promise<Nullable<Role>> => {
        const role = await RoleEntityMysql.findOne({
            select: {
                _id: true,
                name: true,
                description: true,
                created: true
            },
            where: {
                _id: id._value,
                removed: RemovedType.NOT_REMOVED
            }
        });

        if (role === null) return null;

        return Role.fromPrimitives(role);
    };
}
