import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class DescriptionEmptyException extends InvalidArgumentError {
    constructor() {
        super('Role description cannot be empty', http.status.BAD_REQUEST);
    }
}
