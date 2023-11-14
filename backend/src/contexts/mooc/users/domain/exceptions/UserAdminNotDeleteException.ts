import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class UserAdminNotDeleteException extends InvalidArgumentError {
    constructor() {
        super('Unable to remove root administrator', http.status.NOT_FOUND);
    }
}
