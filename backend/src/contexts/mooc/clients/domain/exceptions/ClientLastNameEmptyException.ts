import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class ClientLastNameEmptyException extends InvalidArgumentError {
    constructor() {
        super('Last name cannot be empty', http.status.BAD_REQUEST);
    }
}
