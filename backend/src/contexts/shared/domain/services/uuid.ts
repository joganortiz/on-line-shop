import { validate } from 'uuid';
import { UuidNotValidException } from '../exceptions/UuidNotValidException';

export class uuidValidate {
    readonly _value: string;

    constructor(value: string, field?: string) {
        if (!validate(value)) throw new UuidNotValidException(value, field);

        this._value = value;
    }
}

