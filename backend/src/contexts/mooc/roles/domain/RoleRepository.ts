import { Nullable } from '@contexts/shared/domain/Nullable';
import { type Role } from './Role';
import { RoleId, RoleName } from './value-objects';

export interface RoleRepository {
    /**
     * @description list all roles
     * @date 10/23/2023 - 7:23:49 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<{ total: number; roles: {}; }>}
     */
    getAll: (start?: number, limit?: number) => Promise<{total: number; roles: Role[]}>;

    /**
     * @description get the detail of a role by id
     * @date 10/24/2023 - 9:43:57 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: RoleId) => Promise<Nullable<Role>>}
     */
    getById: (id: RoleId) => Promise<Nullable<Role>>;

    /**
     * @description insert a new role
     * @date 10/25/2023 - 8:20:41 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(role: Role) => Promise<Role>}
     */
    save: (role: Role) => Promise<Role>;

    
    /**
     * @description role by name
     * @date 10/25/2023 - 8:23:44 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(name: RoleName, id: RoleId) => Promise<Nullable<Role>>}
     */
    getByName: (name: RoleName, id: RoleId) => Promise<Nullable<Role>>;
}
