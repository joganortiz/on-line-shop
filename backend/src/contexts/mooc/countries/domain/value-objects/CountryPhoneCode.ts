import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { PhoneCodeEmptyException } from '../exceptions';

export class CountryPhoneCode extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(20, 'phone code');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new PhoneCodeEmptyException();
        }
    }
}
