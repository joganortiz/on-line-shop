import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { CurrencyEmptyException } from '../exceptions';

export class CountryCurrency extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(15, 'currency');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new CurrencyEmptyException();
        }
    }
}
