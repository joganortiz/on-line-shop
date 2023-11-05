import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class FlagEmptyException extends InvalidArgumentError {
    constructor() {
        super('Country flag cannot be empty', http.status.BAD_REQUEST);
    }
}
