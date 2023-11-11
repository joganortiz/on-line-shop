import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class UserLastNameEmptyException extends InvalidArgumentError {
    constructor() {
        super('User last name cannot be empty', http.status.BAD_REQUEST);
    }
}
