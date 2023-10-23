import { InvalidArgumentError } from "@contexts/shared/domain/exceptions/InvalidArgumentError";
import { http } from "@contexts/shared/infrastructure/plugins/http";

export class RoleNotFoundNameException extends InvalidArgumentError {
    constructor() {
        super('Role name cannot be empty', http.status.NOT_FOUND);
    }
}
