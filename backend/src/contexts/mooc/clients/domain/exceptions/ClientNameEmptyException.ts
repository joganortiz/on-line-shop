import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class ClientNameEmptyException extends InvalidArgumentError {
    constructor() {
        super('Name cannot be empty', http.status.BAD_REQUEST);
    }
}
