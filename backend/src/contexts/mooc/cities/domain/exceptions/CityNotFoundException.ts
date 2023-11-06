import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import httpStatus from 'http-status';

export class CityNotFoundException extends InvalidArgumentError {
    constructor() {
        super('City not found', httpStatus.NOT_FOUND);
    }
}
