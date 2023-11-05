import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { Iso2EmptyException } from '../exceptions';

export class CountryIso2 extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(2, 'iso2');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new Iso2EmptyException();
        }
    }
}
