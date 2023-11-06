import { uuidValid } from '@src/contexts/shared/domain/services/uuidValidate';

export class UserId extends uuidValid {
    constructor(value: string) {
        super(value, 'id user');
    }
}
