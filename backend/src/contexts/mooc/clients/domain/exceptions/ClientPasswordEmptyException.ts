import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class ClientPasswordEmptyException extends InvalidArgumentError {
    constructor() {
        super('password cannot be empty', http.status.BAD_REQUEST);
    }
}
