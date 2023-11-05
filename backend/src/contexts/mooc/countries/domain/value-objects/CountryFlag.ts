import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { FlagEmptyException } from '../exceptions';

export class CountryFlag extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(200, 'flag');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new FlagEmptyException();
        }
    }
}
