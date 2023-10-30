export class PermissionDelete {
    readonly _value: string;
    constructor(value: string) {
        this._value = value === '1' ? '1' : '0';
    }
}
