import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class UserUserNameEmptyException extends InvalidArgumentError {
    constructor() {
        super('Username is not valid', http.status.BAD_REQUEST);
    }
}
