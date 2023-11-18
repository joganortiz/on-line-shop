import { uuidValid } from '@src/contexts/shared/domain/services/uuidValidate';

export class ClientId extends uuidValid {
    constructor(value: string) {
        super(value, 'id user');
    }
}
