import { http } from '@contexts/shared/infrastructure/plugins/http';
import { InvalidArgumentError } from '../exceptions/InvalidArgumentError';

export abstract class StringValueObject {
    private readonly _valueString?: string;
    constructor(value?: string) {
        this._valueString= value;
    }

    
    /**
     * @description function that validates the value of the variable yes is required
     * @date 10/23/2023 - 8:30:05 PM
     * @author Jogan Ortiz Muñoz
     *
     * @protected
     * @type {() => boolean}
     */
    protected ensureValueIsDefined = (): boolean => {
        if (
            this._valueString=== null ||
            this._valueString=== undefined ||
            this._valueString=== ''
        ) {
            return false;
        }

        return true;
    };

    
    /**
     * @description Function that validates if the value is null and converts it to empty
     * @date 10/23/2023 - 8:29:54 PM
     * @author Jogan Ortiz Muñoz
     *
     * @protected
     * @type {(value: string) => string}
     */
    protected validateNullValue = (value: string): string => {
        if (value === null) return '';

        return value;
    };

    /**
     * @description function that validates the maximum number of characters in a variable
     * @date 10/23/2023 - 8:29:41 PM
     * @author Jogan Ortiz Muñoz
     *
     * @protected
     * @type {(length: number, field: string) => void}
     */
    protected ensureMaxLength = (length = 5, field: string): void => {
        if (
            this._valueString!== undefined &&
            this._valueString!== null &&
            this._valueString?.toString().length > length
        ) {
            throw new InvalidArgumentError(
                `The field <${field}> has more than ${length} characters allowed`,
                http.status.BAD_REQUEST
            );
        }
    };

    
    /**
     * @description validate if the email received is valid
     * @date 10/23/2023 - 8:30:13 PM
     * @author Jogan Ortiz Muñoz
     *
     * @protected
     * @type {() => boolean}
     */
    protected validateEmailValue = (): boolean => {
        if(this._valueString == undefined) return false;

        const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]{3,}\.[a-z]{2,4}/);

        return regex.test(this._valueString);
    };

    
    /**
     * @description valid regular expression
     * @date 10/23/2023 - 8:31:00 PM
     * @author Jogan Ortiz Muñoz
     *
     * @protected
     * @type {(reg: any) => boolean}
     */
    protected validateRegExp = (reg: RegExp | string): boolean => {
        if(this._valueString == undefined) return false;

        const regex = new RegExp(reg);

        return regex.test(this._valueString);
    };
}
