import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class StateSelectFirstException extends InvalidArgumentError {
    constructor() {
        super('You must first select a state', http.status.BAD_REQUEST);
    }
}
