import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { NameEmptyException } from '../exceptions';

export class CountryName extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(50, 'name');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new NameEmptyException();
        }
    }
}
