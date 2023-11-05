import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { NameEmptyException } from '../exceptions';

export class CityName extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(100, 'name');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new NameEmptyException();
        }
    }
}
