import { http } from '@contexts/shared/infrastructure/plugins/http';
import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';

export class ExistByNameException extends InvalidArgumentError {
    constructor() {
        super('The role already exists in the system.', http.status.NOT_FOUND);
    }
}
