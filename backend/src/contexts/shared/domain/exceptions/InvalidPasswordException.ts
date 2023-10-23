import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidPasswordException extends InvalidArgumentError {
    constructor() {
        super(
            'Password invalid. Minimum 8 characters and maximum 15, at least one uppercase letter, at least one lowercase letter, at least one digit or one special character, no blank spaces.',
            404
        );
    }
}
