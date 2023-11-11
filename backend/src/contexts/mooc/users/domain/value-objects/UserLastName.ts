import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { UserLastNameEmptyException } from '../exceptions';

export class UserLastName extends StringValueObject {
    readonly _value: string;

    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(50, 'last name');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new UserLastNameEmptyException();
        }
    }
}
