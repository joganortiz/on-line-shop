import { uuidValid } from '@src/contexts/shared/domain/services/uuidValidate';

export class PermissionId extends uuidValid {
    constructor(value: string) {
        super(value, 'id permission role');
    }
}
