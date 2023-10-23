import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidPasswordException extends InvalidArgumentError {
    constructor(extension: string, arrayExtension: string[]) {
        super(
            `The extension ${extension} is not allowed - ${arrayExtension}`,
            404
        );
    }
}
