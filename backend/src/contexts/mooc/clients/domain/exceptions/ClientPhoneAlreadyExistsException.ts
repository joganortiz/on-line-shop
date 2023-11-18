import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class ClientPhoneAlreadyExistsException extends InvalidArgumentError {
    constructor() {
        super('The phone already exists', http.status.NOT_FOUND);
    }
}
