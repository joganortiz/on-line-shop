import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class ClientEmailNotValidException extends InvalidArgumentError {
    constructor() {
        super('Must have a valid email format', http.status.BAD_REQUEST);
    }
}
