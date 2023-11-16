import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class CityNotFoundByIdStateAndIdCountryException extends InvalidArgumentError {
    constructor() {
        super('City no exist by id State', http.status.NOT_FOUND);
    }
}
