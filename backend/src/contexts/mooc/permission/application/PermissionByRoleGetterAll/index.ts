import { type SubModuleRepository } from '@src/contexts/mooc/subModule/domain/SubModuleRepository';
import { type PermissionRoleRepository } from '../../domain/PermissionRoleRepository';
import { RoleGetterById } from '@src/contexts/mooc/roles/domain/services/RoleGetterById';
import { type RoleRepository } from '@src/contexts/mooc/roles/domain';
import { type SubModule } from '@src/contexts/mooc/subModule/domain/SubModule';
import { type Permission } from '../../domain/Permission';

interface listPermission {
    subModule: string;
    idSubModule: string;
    url: string;
    crud: {
        create: string;
        read: string;
        update: string;
        delete: string;
    };
}

interface listModule {
    module: string;
    idModule: string;
    icon: string;
    unique: string;
    permission: listPermission[];
}

export class PermissionByRoleGetterAll {
    private readonly _permissionRepository: PermissionRoleRepository;
    private readonly _subModuleRepository: SubModuleRepository;
    private readonly _getterRoleById: RoleGetterById;
    constructor(
        permissionRepository: PermissionRoleRepository,
        subModuleRepository: SubModuleRepository,
        roleRepository: RoleRepository
    ) {
        this._permissionRepository = permissionRepository;
        this._subModuleRepository = subModuleRepository;
        this._getterRoleById = new RoleGetterById(roleRepository);
    }

    /**
     * @description list all the modules with their permissions that the role has
     * @date 8/1/2023 - 9:42:21 PM
     * @author Jogan Ortiz Muñoz
     *
     * @async
     * @param {string} id
     * @returns {Promise<{ role: string; modules: listModule[] }>}
     */
    run = async (
        id: string
    ): Promise<{ role: string; modules: listModule[] }> => {
        const role = await this._getterRoleById.run(id);

        // we get the modules
        const subModule = await this._subModuleRepository.getAllSubModule();
        const listSubModule = subModule.map((subModule: SubModule) =>
            subModule.toPrimitives()
        );

        const listModules: listModule[] = [];
        for (let i = 0; i < listSubModule.length; i++) {
            const subModuleItem = listSubModule[i];
            let exist = false;
            let item = 0;
            for (let t = 0; t < listModules.length; t++) {
                const listModuleItem = listModules[t];
                if (listModuleItem.idModule === subModuleItem.module?._id) {
                    exist = true;
                    item = t;
                }
            }

            if (!exist) {
                if (subModuleItem.module !== undefined) {
                    listModules.push({
                        module: subModuleItem.module.title,
                        idModule: subModuleItem.module._id,
                        icon: subModuleItem.module.icon,
                        unique: subModuleItem.module.children,
                        permission: [
                            {
                                subModule: subModuleItem.title,
                                idSubModule: subModuleItem._id,
                                url: subModuleItem.url,
                                crud: {
                                    create: '0',
                                    read: '0',
                                    update: '0',
                                    delete: '0'
                                }
                            }
                        ]
                    });
                }
            } else {
                listModules[item].permission.push({
                    subModule: subModuleItem.title,
                    idSubModule: subModuleItem._id,
                    url: subModuleItem.url,
                    crud: {
                        create: '0',
                        read: '0',
                        update: '0',
                        delete: '0'
                    }
                });
            }
        }

        // We look for the permissions that the role has
        const permission =
            await this._permissionRepository.getAllRolePermission(role._id);
        const listPermission = permission.map((permission: Permission) =>
            permission.toPrimitives()
        );

        for (let i = 0; i < listPermission.length; i++) {
            const permissionItem = listPermission[i];
            for (let t = 0; t < listModules.length; t++) {
                const listModuleItem = listModules[t];
                if (
                    permissionItem.subModule?.module?._id === undefined ||
                    listModuleItem.idModule !==
                        permissionItem.subModule?.module?._id
                )
                    continue;

                // if the submodule matches we add the permissions
                for (let j = 0; j < listModuleItem.permission.length; j++) {
                    const element = listModuleItem.permission[j];
                    if (
                        permissionItem.subModule._id !== undefined &&
                        element.idSubModule === permissionItem.subModule._id
                    ) {
                        listModuleItem.permission[j].crud = {
                            create: permissionItem.create,
                            read: permissionItem.read,
                            update: permissionItem.update,
                            delete: permissionItem.delete
                        };
                    }
                }
            }
        }

        return {
            role: role._id._value,
            modules: listModules
        };
    };
}
