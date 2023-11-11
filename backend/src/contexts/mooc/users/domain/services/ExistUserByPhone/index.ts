import { type UserRepository } from '../../UserRepository';
import { UserId, UserPhone } from '../../value-objects';

export class ExistUserByPhone {
    private readonly _userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    async run(idUser: string, phone?: string): Promise<boolean> {
        if (phone === undefined || phone === null) return false;

        const id = new UserId(idUser);
        const userPhone: UserPhone = new UserPhone(phone);

        const user = await this._userRepository.getByPhone(userPhone, id);

        if (user !== null) return true;

        return false;
    }
}
