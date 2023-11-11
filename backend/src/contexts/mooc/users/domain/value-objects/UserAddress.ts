import { StringValueObject } from '@src/contexts/shared/domain/value-object';

export class UserAddress extends StringValueObject {
    readonly _value?: string;

    constructor(value?: string) {
        super(value);
        this.ensureMaxLength(55, 'address');

        this._value = this.convertValueToUndefined();
    }
}
