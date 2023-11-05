import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class TldEmptyException extends InvalidArgumentError {
    constructor() {
        super('Country tld cannot be empty', http.status.BAD_REQUEST);
    }
}
