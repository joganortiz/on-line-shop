import { InvalidPasswordException } from '../../domain/exceptions/InvalidPasswordException';
import { type BcryptRepository } from '../../domain/plugins/BcryptRepository';
import { bcrypt } from '../plugins/bcrypt';

export class Bcrypt implements BcryptRepository {
    cryptPassword = async (password: string): Promise<string> => {
        if (password === undefined || password === null || password === '')
            return '';

        const regex = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.0-9])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        );

        if (!regex.test(password)) throw new InvalidPasswordException();

        const passwordHas = await bcrypt.hash(password);

        return passwordHas;
    };
}
