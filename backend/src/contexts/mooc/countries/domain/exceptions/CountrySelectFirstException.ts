import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class CountrySelectFirstException extends InvalidArgumentError {
    constructor() {
        super('You must first select a country', http.status.BAD_REQUEST);
    }
}
