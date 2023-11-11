import { type UserRepository } from '../../UserRepository';
import { UserId, UserUserName } from '../../value-objects';

export class ExistUserByUserName {
    private readonly _userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    async run(idUser: string, username: string): Promise<boolean> {
        const id = new UserId(idUser);
        const userName = new UserUserName(username);

        const user = await this._userRepository.getByUserName(userName, id);

        if (user !== null) return true;

        return false;
    }
}
