import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class CurrencyEmptyException extends InvalidArgumentError {
    constructor() {
        super('Country currency cannot be empty', http.status.BAD_REQUEST);
    }
}
