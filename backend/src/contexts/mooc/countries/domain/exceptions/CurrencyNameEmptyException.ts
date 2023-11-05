import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class CurrencyNameEmptyException extends InvalidArgumentError {
    constructor() {
        super('Country currency name cannot be empty', http.status.BAD_REQUEST);
    }
}
