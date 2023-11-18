import { StringValueObject } from '@src/contexts/shared/domain/value-object';
import { ClientNameEmptyException } from '../exceptions';

export class ClientName extends StringValueObject {
    readonly _value: string;

    constructor(value: string) {
        super(value);
        this.isDefiniteValue();
        this.ensureMaxLength(50, 'name');

        this._value = value;
    }

    private readonly isDefiniteValue = (): void => {
        const isDefinite = this.ensureValueIsDefined();

        if (!isDefinite) {
            throw new ClientNameEmptyException();
        }
    };
}
