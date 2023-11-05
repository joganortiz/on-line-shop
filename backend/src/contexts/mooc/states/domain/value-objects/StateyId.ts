import { uuidValid } from '@src/contexts/shared/domain/services/uuidValidate';

export class StateId extends uuidValid {
    constructor(value: string) {
        super(value, 'id state');
    }
}
