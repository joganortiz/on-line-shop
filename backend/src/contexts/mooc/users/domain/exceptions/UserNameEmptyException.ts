import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class UserNameEmptyException extends InvalidArgumentError {
    constructor() {
        super('User name cannot be empty', http.status.BAD_REQUEST);
    }
}
