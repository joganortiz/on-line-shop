import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import httpStatus from 'http-status';

export class StateNotFoundException extends InvalidArgumentError {
    constructor() {
        super('State not found', httpStatus.NOT_FOUND);
    }
}
