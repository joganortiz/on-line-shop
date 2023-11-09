import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class UserNotFoundException extends InvalidArgumentError {
    constructor() {
        super('User not found', http.status.NOT_FOUND);
    }
}
