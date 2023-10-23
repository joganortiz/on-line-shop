import { StringValueObject } from '@contexts/shared/domain/value-object';
import { RoleNotFoundNameException } from '../exceptions/RoleNotFoundNameException';
import { uuidValidate } from '@contexts/shared/domain/services/uuid';

export class RoleId {
    readonly _value: string;
    constructor(value: string) {
        this._value = new uuidValidate(value)._value;
    }
}

export class RoleName extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(50, 'name');
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new RoleNotFoundNameException();
        }
    }
}

export class RoleDescription extends StringValueObject {
    constructor(value: string) {
        super(value);
    }
}

export class RoleCreated {
    readonly _value?: Date;
    constructor(value?: Date) {
        this._value = value;
    }
}
