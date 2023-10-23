import { InvalidArgumentError } from "@contexts/shared/domain/exceptions/InvalidArgumentError";
import { http } from "@contexts/shared/infrastructure/plugins/http";


export class RoleNotFoundException extends InvalidArgumentError {
    constructor() {
        super('Role not found', http.status.NOT_FOUND);
    }
}
