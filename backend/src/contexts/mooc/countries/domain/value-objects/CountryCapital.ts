import { StringValueObject } from '@src/contexts/shared/domain/value-object';

export class CountryCapital extends StringValueObject {
    readonly _value?: string;
    constructor(value?: string) {
        super(value);
        this.ensureMaxLength(50, 'capital');
        this._value = value;
    }
}
