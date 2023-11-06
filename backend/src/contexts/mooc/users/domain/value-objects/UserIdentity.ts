import { StringValueObject } from '@src/contexts/shared/domain/value-object';

export class UserIdentity extends StringValueObject {
    readonly _value?: string;

    constructor(value?: string) {
        super(value);
        this.ensureMaxLength(30, 'identity');

        this._value = this.convertValueToUndefined();
    }
}
