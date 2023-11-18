import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class ClientEmailEmptyException extends InvalidArgumentError {
    constructor() {
        super('must have a valid email format', http.status.BAD_REQUEST);
    }
}
