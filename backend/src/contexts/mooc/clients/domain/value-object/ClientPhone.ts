import { StringValueObject } from '@src/contexts/shared/domain/value-object';

export class ClientPhone extends StringValueObject {
    readonly _value?: string;

    constructor(value?: string) {
        super(value);
        this.ensureMaxLength(30, 'phone');

        this._value = this.convertValueToUndefined();
    }
}
