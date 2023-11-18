import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class ClientUserNameEmptyException extends InvalidArgumentError {
    constructor() {
        super('Username cannot be empty', http.status.BAD_REQUEST);
    }
}
