import { type Role } from './Role';

export interface RoleRepository {
    /**
     * @description list all roles
     * @date 10/23/2023 - 7:23:49 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(start?: number, limit?: number) => Promise<{ total: number; roles: {}; }>}
     */
    getAll: (start?: number, limit?: number) => Promise<{total: number; roles: Role[]}>;
}
