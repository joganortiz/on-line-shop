import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import {
    ClientEmailEmptyException,
    ClientEmailNotValidException
} from '../exceptions';

export class ClientEmail extends StringValueObject {
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
            throw new ClientEmailEmptyException();
        }
    };

    private readonly isEmailValue = (): void => {
        const isEmail = this.validateEmailValue();

        if (!isEmail) throw new ClientEmailNotValidException();
    };
}
