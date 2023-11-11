import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import {
    UserEmailEmptyException,
    UserEmailNotValidException
} from '../exceptions';

export class UserEmail extends StringValueObject {
    readonly _value: string;

    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.isEmailValue();
        this.ensureMaxLength(55, 'email');

        this._value = value;
    }

    private readonly isDefiniteValue = (): void => {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new UserEmailEmptyException();
        }
    };

    private readonly isEmailValue = (): void => {
        const isEmail = this.validateEmailValue();

        if (!isEmail) throw new UserEmailNotValidException();
    };
}
