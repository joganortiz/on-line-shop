import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { CurrencySymbolException } from '../exceptions';

export class CountryCurrencySymbol extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(10, 'currency symbol');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new CurrencySymbolException();
        }
    }
}
