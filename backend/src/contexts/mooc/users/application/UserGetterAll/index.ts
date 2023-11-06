import { type User } from '../../domain/User';
import { type UserRepository } from '../../domain/UserRepository';
import { type PrimitiveUser } from '../../domain/interfaces';

export class UserGetterAllUseCase {
    private readonly _userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    run = async (
        query: any
    ): Promise<{ total: number; data: PrimitiveUser[] }> => {
        const result = await this._userRepository.getAll(
            parseInt(query.start ?? 0),
            parseInt(query.limit ?? 0)
        );

        const resultDataPrimitives = result.users.map((user: User) =>
            user.toPrimitives()
        );

        return { total: result.total, data: resultDataPrimitives };
    };
}
