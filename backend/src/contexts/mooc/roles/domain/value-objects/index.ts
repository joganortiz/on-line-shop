import { StringValueObject } from '@contexts/shared/domain/value-object';
import { NameEmptyException } from '../exceptions/NameEmptyException';
import { uuidValid } from '@contexts/shared/domain/services/uuidValidate';
import { DescriptionEmptyException } from '../exceptions/DescriptionEmptyException';

export class RoleId extends uuidValid {
    constructor(value: string) {
        super(value)
    }
}

export class RoleName extends StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(50, 'name');

        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new NameEmptyException();
        }
    }
}

export class RoleDescription extends StringValueObject {
    readonly _value: string;

    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(500, 'description');
        this._value = value;
    }

    private isDefiniteValue(): void {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new DescriptionEmptyException();
        }
    }
}

export class RoleCreated {
    readonly _value?: Date;
    constructor(value?: Date) {
        this._value = value;
    }
}
