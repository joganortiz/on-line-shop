import { Permission } from '@Contexts/Mooc/permission/domain/Permission/Permission';
import { type PermissionRepository } from '@Contexts/Mooc/permission/domain/Permission/PermissionRepository';
import { type SubModule } from '@Contexts/Mooc/permission/domain/SubModule/SubModule';
import { type SubModuleRepository } from '@Contexts/Mooc/permission/domain/SubModule/SubModuleRepository';
import { ExistSubModuleById } from '@Contexts/Mooc/permission/domain/SubModule/services/ExistSubModuleById';
import { type RoleRepository } from '@Contexts/Mooc/roles/domain/RoleRepository';
import { ExistRoleById } from '@Contexts/Mooc/roles/domain/services/ExistRoleById';
import { type UuidV4Repository } from '@Contexts/Mooc/shared/domain/uuidV4Repository';
import { type CommandCaseOfUse } from '@Contexts/Shared/domain/CommandCaseOfUse';

export class PermissionByRoleUpdate implements CommandCaseOfUse<void> {
    private readonly _permissionRepository: PermissionRepository;
    private readonly _existSubModuleById: ExistSubModuleById;
    private readonly _existRoleById: ExistRoleById;
    private readonly _uuidGenerator: UuidV4Repository;
    constructor(
        permissionRepository: PermissionRepository,
        subModuleRepository: SubModuleRepository,
        roleRepository: RoleRepository,
        uuidGenerator: UuidV4Repository
    ) {
        this._permissionRepository = permissionRepository;
        this._existSubModuleById = new ExistSubModuleById(subModuleRepository);
        this._existRoleById = new ExistRoleById(roleRepository);
        this._uuidGenerator = uuidGenerator;
    }

    run = async (id: string, dataPermission: any[]): Promise<void> => {
        // We validate if the role exists
        const role = await this._existRoleById.run(id);

        const listSubModule: SubModule[] = [];
        const permissionCrud: any[] = [];
        for (let i = 0; i < dataPermission.length; i++) {
            const element = dataPermission[i];
            listSubModule.push(
                await this._existSubModuleById.run(element.submodule)
            );
            permissionCrud.push({
                create: element.create.toString() === '1' ? '1' : '0',
                read: element.read.toString() === '1' ? '1' : '0',
                update: element.update.toString() === '1' ? '1' : '0',
                delete: element.delete.toString() === '1' ? '1' : '0'
            });
        }

        // eliminar los permisos de ese rol
        this._permissionRepository.deleteRolePermission(role.id);

        // recorremos los nuevos permisos
        for (let index = 0; index < listSubModule.length; index++) {
            const subModule: SubModule = listSubModule[index];
            const crud = permissionCrud[index];
            const permission = Permission.fromPrimitives({
                _id: await this._uuidGenerator.generate(),
                create: crud.create,
                read: crud.read,
                update: crud.update,
                delete: crud.delete,
                role: {
                    _id: role.id._value,
                    name: role.name._value
                },
                subModule: {
                    _id: subModule.id._value,
                    title: subModule.title._value,
                    order: subModule.order._value,
                    url: subModule.url._value
                }
            });

            await this._permissionRepository.saveRolePermission(permission);
        }
    };
}
