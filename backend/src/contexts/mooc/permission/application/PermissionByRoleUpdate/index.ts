import { SubModuleGetterById } from '@src/contexts/mooc/subModule/domain/services/SubModuleGetterById';
import { type PermissionRoleRepository } from '../../domain/PermissionRoleRepository';
import { RoleGetterById } from '@src/contexts/mooc/roles/domain/services/RoleGetterById';
import { type SubModuleRepository } from '@src/contexts/mooc/subModule/domain/SubModuleRepository';
import { type RoleRepository } from '@src/contexts/mooc/roles/domain';
import { type UuidRepository } from '@src/contexts/shared/domain/plugins/UuidRepository';
import { type SubModule } from '@src/contexts/mooc/subModule/domain/SubModule';
import { Permission } from '../../domain/Permission';

export class PermissionByRoleUpdate {
    private readonly _permissionRepository: PermissionRoleRepository;
    private readonly _existSubModuleById: SubModuleGetterById;
    private readonly _existRoleById: RoleGetterById;
    private readonly _uuidGenerator: UuidRepository;
    constructor(
        permissionRepository: PermissionRoleRepository,
        subModuleRepository: SubModuleRepository,
        roleRepository: RoleRepository,
        uuidGenerator: UuidRepository
    ) {
        this._permissionRepository = permissionRepository;
        this._existSubModuleById = new SubModuleGetterById(subModuleRepository);
        this._existRoleById = new RoleGetterById(roleRepository);
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
        this._permissionRepository.deleteRolePermission(role._id);

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
                    _id: role._id._value,
                    name: role.name._value,
                    description: role.description._value
                },
                subModule: {
                    _id: subModule._id._value,
                    title: subModule.title._value,
                    order: subModule.order._value,
                    url: subModule.url._value
                }
            });

            await this._permissionRepository.saveRolePermission(permission);
        }
    };
}
