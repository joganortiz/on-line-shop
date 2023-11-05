import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class Iso2EmptyException extends InvalidArgumentError {
    constructor() {
        super('Country iso2 cannot be empty', http.status.BAD_REQUEST);
    }
}
