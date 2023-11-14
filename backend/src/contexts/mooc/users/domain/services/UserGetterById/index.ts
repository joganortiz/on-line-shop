import { type User } from '../../User';
import { type UserRepository } from '../../UserRepository';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';
import { UserId } from '../../value-objects';

export class UserGetterById {
    private readonly _userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    async run(id: string): Promise<User> {
        const idUser = new UserId(id);
        const user = await this._userRepository.getById(idUser);

        if (user === null) throw new UserNotFoundException();

        return user;
    }
}
