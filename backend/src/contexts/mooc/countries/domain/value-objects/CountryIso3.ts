import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { Iso3EmptyException } from '../exceptions';

export class CountryIso3 extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(3, 'iso3');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new Iso3EmptyException();
        }
    }
}
