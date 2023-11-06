import { type User } from './User';

export interface UserRepository {
    getAll: (
        start: number,
        limit: number
    ) => Promise<{ total: number; users: User[] }>;
}
