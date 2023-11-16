import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class StateNotFoundByIdCountryException extends InvalidArgumentError {
    constructor() {
        super('State no exist by id Country', http.status.NOT_FOUND);
    }
}
