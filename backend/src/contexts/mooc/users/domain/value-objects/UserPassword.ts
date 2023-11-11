import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { UserPasswordEmptyException } from '../exceptions';

export class UserPassword extends StringValueObject {
    readonly _value: string;

    constructor(value: string) {
        super(value);
        this.isDefiniteValue();

        this._value = value;
    }

    private readonly isDefiniteValue = (): void => {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new UserPasswordEmptyException();
        }
    };
}
