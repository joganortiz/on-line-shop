
import { uuidValidate } from '@contexts/shared/infrastructure/plugins/uuid';
import { UuidNotValidException } from '../exceptions/UuidNotValidException';

export class uuidValid {
    readonly _value: string;

    constructor(value: string, field?: string) {
        if (!uuidValidate(value)) throw new UuidNotValidException(value, field);

        this._value = value;
    }
}

