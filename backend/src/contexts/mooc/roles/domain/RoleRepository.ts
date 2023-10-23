import { type Role } from './Role';

export interface RoleRepository {
    getAll: () => Promise<{total: number; roles: Role[]}>;
}
