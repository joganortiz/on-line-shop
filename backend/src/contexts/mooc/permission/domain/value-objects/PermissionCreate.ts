export class PermissionCreate {
    readonly _value: string;
    constructor(value: string) {
        this._value = value === '1' ? '1' : '0';
    }
}
