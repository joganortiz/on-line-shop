import { StringValueObject } from '@src/contexts/shared/domain/value-object';

export class ClientCodePhone extends StringValueObject {
    readonly _value?: string;
    constructor(value?: string) {
        super(value);
        this.ensureMaxLength(20, 'code phone');

        this._value = this.convertValueToUndefined();
    }
}
