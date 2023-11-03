import { type RoleId } from '@src/contexts/mooc/roles/domain/value-objects';
import { Permission } from '../../domain/Permission';
import { type PermissionRoleRepository } from '../../domain/PermissionRoleRepository';
import { PermissionRoleEntityMysql } from '../persistence/typeorm';
import { StatusType } from '@src/contexts/shared/domain/typeOrm';
import { SubModuleEntityMysql } from '@src/contexts/mooc/subModule/infrastructure/persistence/typeorm';
import { RoleEntityMysql } from '@src/contexts/mooc/roles/infrastructure/persistence/typeorm';

export class MySqlPermissionRoleRepository implements PermissionRoleRepository {
    getAllRolePermission = async (id: RoleId): Promise<Permission[]> => {
        const items = await PermissionRoleEntityMysql.find({
            select: {
                _id: true,
                create: true,
                read: true,
                delete: true,
                update: true
            },
            relations: {
                role: true,
                subModule: {
                    module: true
                }
            },
            where: {
                role: {
                    _id: id._value
                }
            }
        });

        const permission = items.map((item) => {
            return Permission.fromPrimitives(item);
        });

        return permission;
    };

    saveRolePermission = async (permission: Permission): Promise<boolean> => {
        const preparePermission = new PermissionRoleEntityMysql();
        preparePermission._id = permission.id._value;
        preparePermission.create =
            permission.create._value === '1'
                ? StatusType.ACTIVE
                : StatusType.INACTIVE;
        preparePermission.read =
            permission.read._value === '1'
                ? StatusType.ACTIVE
                : StatusType.INACTIVE;
        preparePermission.update =
            permission.update._value === '1'
                ? StatusType.ACTIVE
                : StatusType.INACTIVE;
        preparePermission.delete =
            permission.delete._value === '1'
                ? StatusType.ACTIVE
                : StatusType.INACTIVE;

        const prepareSubModule = new SubModuleEntityMysql();
        prepareSubModule._id = permission.subModule._id._value;

        preparePermission.subModule = prepareSubModule;

        const prepareRole = new RoleEntityMysql();
        prepareRole._id = permission.role._id._value;

        preparePermission.role = prepareRole;

        await preparePermission.save();
        return true;
    };

    deleteRolePermission = async (id: RoleId): Promise<boolean> => {
        await PermissionRoleEntityMysql.delete({
            role: {
                _id: id._value
            }
        });

        return true;
    };
}
