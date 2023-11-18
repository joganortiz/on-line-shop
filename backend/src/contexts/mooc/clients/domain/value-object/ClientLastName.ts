import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { ClientLastNameEmptyException } from '../exceptions';

export class ClientLastName extends StringValueObject {
    readonly _value: string;

    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(50, 'last name');

        this._value = value;
    }

    private readonly isDefiniteValue = (): void => {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new ClientLastNameEmptyException();
        }
    };
}
