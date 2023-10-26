
import { uuid } from '@contexts/shared/infrastructure/plugins/uuid';
import { UuidNotValidException } from '../exceptions/UuidNotValidException';

export class uuidValid {
    readonly _value: string;

    constructor(value: string, field?: string) {
        if (!uuid.validate(value)) throw new UuidNotValidException(value, field);

        this._value = value;
    }
}

