import { type User } from '../../domain/User';
import { type UserRepository } from '../../domain/UserRepository';
import { UserNotFoundException } from '../../domain/exceptions';
import { type PrimitiveUser } from '../../domain/interfaces';
import { UserId } from '../../domain/value-objects';

export class UserGetterByIdUseCase {
    private readonly _userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    run = async (id: string): Promise<PrimitiveUser> => {
        const idUser = new UserId(id);
        const result: User | null = await this._userRepository.getById(idUser);

        if (result === null) throw new UserNotFoundException();

        const resultDataPrimitives = result.toPrimitives();

        return resultDataPrimitives;
    };
}
