export class UserStatus {
    readonly _value: string;
    constructor(value: string) {
        this._value = value !== undefined ? (value === '1' ? '1' : '0') : '0';
    }
}
