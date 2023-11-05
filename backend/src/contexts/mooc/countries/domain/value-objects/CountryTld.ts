import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { TldEmptyException } from '../exceptions/TldEmptyException';

export class CountryTld extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(10, 'tld');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new TldEmptyException();
        }
    }
}
