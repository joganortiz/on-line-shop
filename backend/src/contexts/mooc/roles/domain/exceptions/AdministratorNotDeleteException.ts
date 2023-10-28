import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class AdministratorNotDeleteException extends InvalidArgumentError {
    constructor() {
        super('Cannot delete parent role', http.status.NOT_FOUND);
    }
}
