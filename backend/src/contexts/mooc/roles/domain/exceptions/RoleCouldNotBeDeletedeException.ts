import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class RoleCouldNotBeDeletedeException extends InvalidArgumentError {
    constructor() {
        super('Could not delete role', http.status.NOT_FOUND);
    }
}
