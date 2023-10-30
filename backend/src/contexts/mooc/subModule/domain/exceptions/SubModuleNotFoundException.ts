import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError';
import { http } from '@src/contexts/shared/infrastructure/plugins/http';

export class SubModuleNotFoundException extends InvalidArgumentError {
    constructor(id: string) {
        super(`SubModule by id <${id}> not found`, http.status.NOT_FOUND);
    }
}
