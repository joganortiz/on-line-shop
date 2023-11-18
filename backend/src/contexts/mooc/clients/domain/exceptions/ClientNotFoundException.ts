import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class ClientNotFoundException extends InvalidArgumentError {
    constructor() {
        super('Client not found', http.status.NOT_FOUND);
    }
}
