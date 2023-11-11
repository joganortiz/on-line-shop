import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class IdentityAlreadyExistsException extends InvalidArgumentError {
    constructor() {
        super('User identity already exists', http.status.BAD_REQUEST);
    }
}
