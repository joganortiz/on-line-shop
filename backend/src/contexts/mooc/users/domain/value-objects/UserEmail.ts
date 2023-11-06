import { StringValueObject } from '@src/contexts/shared/domain/value-object';

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
            throw new Error();
        }
    };

    private readonly isEmailValue = (): void => {
        const isEmail = this.validateEmailValue();

        if (!isEmail) throw new Error();
    };
}
