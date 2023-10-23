import { http } from '@contexts/shared/infrastructure/plugins/http';
import { InvalidArgumentError } from '../exceptions/InvalidArgumentError';

export abstract class StringValueObject {
    readonly _value: string;
    constructor(value: string) {
        this._value = value;
    }

    /**
     * @description function that validates the value of the variable yes is required
     * @date 7/21/2023 - 8:02:30 PM
     * @author Jogan Ortiz Muñoz
     *
     * @protected
     */
    protected ensureValueIsDefined = (): boolean => {
        if (
            this._value === null ||
            this._value === undefined ||
            this._value === ''
        ) {
            return false;
        }

        return true;
    };

    /**
     * @description Function that validates if the value is null and converts it to empty
     * @date 9/24/2023 - 5:21:09 PM
     * @author Jogan Ortiz Muñoz
     *
     * @protected
     * @param {string} value
     * @returns {string}
     */
    protected validateNullValue = (value: string): string => {
        if (value === null) return '';

        return value;
    };

    /**
     * @description function that validates the maximum number of characters in a variable
     * @date 7/21/2023 - 7:52:54 PM
     * @author Jogan Ortiz Muñoz
     *
     * @protected
     * @param {number} [length=5]
     * @param {string} field
     */
    protected ensureMaxLength = (length = 5, field: string): void => {
        if (
            this._value !== undefined &&
            this._value !== null &&
            this._value.toString().length > length
        ) {
            throw new InvalidArgumentError(
                `The field <${field}> has more than ${length} characters allowed`,
                http.status.BAD_REQUEST
            );
        }
    };

    protected validateEmailValue = (): boolean => {
        const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]{3,}\.[a-z]{2,4}/);

        return regex.test(this._value);
    };

    protected validateRegExp = (reg: RegExp | string): boolean => {
        const regex = new RegExp(reg);

        return regex.test(this._value);
    };
}
