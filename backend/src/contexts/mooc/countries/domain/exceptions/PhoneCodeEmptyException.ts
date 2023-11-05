import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class PhoneCodeEmptyException extends InvalidArgumentError {
    constructor() {
        super('Country phone code cannot be empty', http.status.BAD_REQUEST);
    }
}
