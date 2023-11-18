import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class ClientUserNameAlreadyExistsException extends InvalidArgumentError {
    constructor() {
        super('The username already exists.', http.status.BAD_REQUEST);
    }
}
