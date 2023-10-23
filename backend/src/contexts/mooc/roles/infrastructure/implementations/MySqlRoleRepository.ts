import { RemovedType } from "@contexts/shared/domain/typeOrm";
import { Role, RoleRepository } from "../../domain";
import { RoleEntityMysql } from "../persistence/typeorm";

export class MySqlRoleRepository implements RoleRepository {    
    getAll = async (): Promise<{total: number; roles: Role[]}> => {
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
            }
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
