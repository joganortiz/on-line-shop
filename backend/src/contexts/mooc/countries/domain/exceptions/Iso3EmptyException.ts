import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@contexts/shared/infrastructure/plugins/http';

export class Iso3EmptyException extends InvalidArgumentError {
    constructor() {
        super('Country iso3 cannot be empty', http.status.BAD_REQUEST);
    }
}
