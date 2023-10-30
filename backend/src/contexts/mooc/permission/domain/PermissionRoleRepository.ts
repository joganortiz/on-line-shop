import { type RoleId } from '../../roles/domain/value-objects';
import { type Permission } from './Permission';

export interface PermissionRoleRepository {
    getAllRolePermission: (idRole: RoleId) => Promise<Permission[]>;
    saveRolePermission: (permission: Permission) => Promise<boolean>;
    deleteRolePermission: (idRole: RoleId) => Promise<boolean>;
}
