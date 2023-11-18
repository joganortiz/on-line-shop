import { RemovedType, StatusType } from '@contexts/shared/domain/typeOrm';
import { Role, type RoleRepository } from '../../domain';
import { RoleEntityMysql } from '../persistence/typeorm';
import { type RoleId, type RoleName } from '../../domain/value-objects';
import { type Nullable } from '@contexts/shared/domain/Nullable';
import { Not } from 'typeorm';

export class MySqlRoleRepository implements RoleRepository {
    /**
     * @description list all roles
     * @date 10/23/2023 - 7:23:49 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<{ total: number; roles: {}; }>}
     */
    getAll = async (
        start?: number,
        limit?: number
    ): Promise<{ total: number; roles: Role[] }> => {
        const limitQuery: { skip?: number; take?: number } = {
            skip: undefined,
            take: undefined
        };

        if (limit !== undefined && limit > 0) {
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
                removed: RemovedType.NOT_REMOVED,
                visible: StatusType.ACTIVE
            },
            order: {
                name: 'ASC'
            },
            ...limitQuery
        });

        const total = await RoleEntityMysql.count({
            where: {
                removed: RemovedType.NOT_REMOVED,
                visible: StatusType.ACTIVE
            }
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

    /**
     * @description insert a new role
     * @date 10/25/2023 - 8:22:22 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(role: Role) => Promise<Role>}
     */
    save = async (role: Role): Promise<Role> => {
        const prepareRole = new RoleEntityMysql();
        prepareRole._id = role._id._value;
        prepareRole.name = role.name._value;
        prepareRole.description = role.description?._value;
        const roleCreate = await prepareRole.save();

        return Role.fromPrimitives(roleCreate);
    };

    /**
     * @description update role data by id
     * @date 10/27/2023 - 11:11:33 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(role: Role) => Promise<boolean>}
     */
    update = async (role: Role): Promise<boolean> => {
        const roleUpdate = await RoleEntityMysql.update(
            { _id: role._id._value },
            {
                name: role.name._value,
                description: role.description?._value
            }
        );

        if (roleUpdate.affected === undefined || roleUpdate.affected <= 0)
            return false;

        return true;
    };

    /**
     * @description delete a role by id
     * @date 10/27/2023 - 11:12:21 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(role: Role) => Promise<boolean>}
     */
    delete = async (role: Role): Promise<boolean> => {
        const roleDelete = await RoleEntityMysql.update(
            { _id: role._id._value },
            { removed: RemovedType.REMOVED }
        );

        if (roleDelete.affected === undefined || roleDelete.affected <= 0)
            return false;

        return true;
    };

    /**
     * @description Gets a role by name
     * @date 10/25/2023 - 8:26:56 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(name: RoleName, id: RoleId) => Promise<Nullable<Role>>}
     */
    getByName = async (name: RoleName, id: RoleId): Promise<Nullable<Role>> => {
        const role = await RoleEntityMysql.findOne({
            where: {
                name: name._value,
                removed: RemovedType.NOT_REMOVED,
                _id: Not(id._value)
            }
        });

        if (role === null) return null;

        return Role.fromPrimitives(role);
    };
}
