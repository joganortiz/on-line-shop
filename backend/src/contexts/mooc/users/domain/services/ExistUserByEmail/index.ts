import { type UserRepository } from '../../UserRepository';
import { UserEmail, UserId } from '../../value-objects';

export class ExistUserByEmail {
    private readonly _userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    async run(email: string, idUser: string): Promise<boolean> {
        const id = new UserId(idUser);
        const userEmail: UserEmail = new UserEmail(email);

        const user = await this._userRepository.getByEmail(userEmail, id);

        if (user !== null) return true;

        return false;
    }
}
