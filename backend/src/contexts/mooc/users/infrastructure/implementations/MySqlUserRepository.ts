import { RemovedType } from '@src/contexts/shared/domain/typeOrm';
import { User } from '../../domain/User';
import { type UserRepository } from '../../domain/UserRepository';
import { UserEntityMysql } from '../persistence/typeorm';

export class MySqlUserRepository implements UserRepository {
    getAll = async (
        start: number,
        limit: number
    ): Promise<{ total: number; users: User[] }> => {
        const limitQuery: { skip?: number; take?: number } = {
            skip: undefined,
            take: undefined
        };

        if (limit !== undefined && limit > 0) {
            limitQuery.skip = start;
            limitQuery.take = limit;
        }

        const items = await UserEntityMysql.find({
            relations: {
                role: true,
                country: true,
                state: true,
                city: true
            },
            where: {
                removed: RemovedType.NOT_REMOVED
            },
            order: {
                created: 'DESC'
            },
            ...limitQuery
        });

        const total = await UserEntityMysql.count({
            where: {
                removed: RemovedType.NOT_REMOVED
            }
        });

        const users = items.map((item) => {
            return User.fromPrimitives(item);
        });

        return { total, users };
    };
}
