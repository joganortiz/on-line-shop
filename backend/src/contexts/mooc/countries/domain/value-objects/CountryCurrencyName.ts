import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { CurrencyNameEmptyException } from '../exceptions';

export class CountryCurrencyName extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(100, 'currency name');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new CurrencyNameEmptyException();
        }
    }
}
