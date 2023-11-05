import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class CurrencySymbolException extends InvalidArgumentError {
    constructor() {
        super(
            'Country currency symbol cannot be empty',
            http.status.BAD_REQUEST
        );
    }
}
