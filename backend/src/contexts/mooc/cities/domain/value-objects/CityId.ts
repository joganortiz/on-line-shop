import { uuidValid } from '@src/contexts/shared/domain/services/uuidValidate';

export class CityId extends uuidValid {
    constructor(value: string) {
        super(value, 'id city');
    }
}
