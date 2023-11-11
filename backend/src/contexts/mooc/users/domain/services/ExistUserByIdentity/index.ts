import { type UserRepository } from '../../UserRepository';
import { UserId, UserIdentity } from '../../value-objects';

export class ExistUserByIdentity {
    private readonly _userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    async run(idUser: string, identity?: string): Promise<boolean> {
        if (identity === undefined || identity === null) return false;

        const id = new UserId(idUser);
        const userIdentity = new UserIdentity(identity);

        const user = await this._userRepository.getByIdentity(userIdentity, id);

        if (user !== null) return true;

        return false;
    }
}
