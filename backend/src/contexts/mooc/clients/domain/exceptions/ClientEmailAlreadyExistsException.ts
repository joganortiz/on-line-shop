import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class ClientEmailAlreadyExistsException extends InvalidArgumentError {
    constructor() {
        super('The email already exists', http.status.BAD_REQUEST);
    }
}
