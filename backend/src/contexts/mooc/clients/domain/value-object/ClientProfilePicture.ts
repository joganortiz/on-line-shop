import { StringValueObject } from '@src/contexts/shared/domain/value-object';

export class ClientProfilePicture extends StringValueObject {
    readonly _value?: string;
    constructor(value?: string) {
        super(value);
        this._value = this.convertValueToUndefined();
    }
}
