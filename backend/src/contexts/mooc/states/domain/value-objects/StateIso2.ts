import { StringValueObject } from '@src/contexts/shared/domain/value-object';

export class StateIso2 extends StringValueObject {
    readonly _value?: string;
    constructor(value?: string) {
        super(value);
        this.ensureMaxLength(10, 'iso2');

        this._value = value;
    }
}
