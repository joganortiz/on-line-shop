import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class CountryNotFoundException extends InvalidArgumentError {
    constructor() {
        super('Country not found', http.status.NOT_FOUND);
    }
}
