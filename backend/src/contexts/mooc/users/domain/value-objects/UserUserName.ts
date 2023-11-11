import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import {
    UserUserNameEmptyException,
    UserUserNameNotValidException
} from '../exceptions';

export class UserUserName extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(20, 'username');
        this.isUsernameValidValue();

        this._value = value;
    }

    private readonly isDefiniteValue = (): void => {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new UserUserNameEmptyException();
        }
    };

    private readonly isUsernameValidValue = (): void => {
        const isUsernameValid = this.validateRegExp(/^[a-z0-9-.]+$/);

        if (!isUsernameValid) throw new UserUserNameNotValidException();
    };
}
