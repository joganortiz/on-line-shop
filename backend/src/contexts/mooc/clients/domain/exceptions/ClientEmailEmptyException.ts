import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class ClientEmailEmptyException extends InvalidArgumentError {
    constructor() {
        super('Email cannot be empty', http.status.BAD_REQUEST);
    }
}
