import { InvalidArgumentError } from './InvalidArgumentError';

export class UuidNotValidException extends InvalidArgumentError {
    constructor(value: string, field?: string) {
        const message =
            field !== undefined
                ? `The ${field} is not a valid uuid`
                : `Uuid <${value}> not valid`;
        super(message, 404);
    }
}
