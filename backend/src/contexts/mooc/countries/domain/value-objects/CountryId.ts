import { uuidValid } from '@src/contexts/shared/domain/services/uuidValidate';

export class CountryId extends uuidValid {
    constructor(value: string) {
        super(value, 'id country');
    }
}
