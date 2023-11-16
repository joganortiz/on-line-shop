import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class StateNotFoundException extends InvalidArgumentError {
    constructor() {
        super('State not found', http.status.NOT_FOUND);
    }
}
