import { uuidValid } from '@src/contexts/shared/domain/services/uuidValidate';

export class SubModuleId extends uuidValid {
    constructor(value: string) {
        super(value, 'id sub-module');
    }
}

export class SubModuleTitle {
    readonly _value: string;
    constructor(value: string) {
        this._value = value;
    }
}

export class SubModuleOrder {
    readonly _value: number;
    constructor(value: number) {
        this._value = value;
    }
}

export class SubModuleUrl {
    readonly _value: string;
    constructor(value: string) {
        this._value = value;
    }
}

export class SubModuleCreate {
    readonly _value: Date | undefined;
    constructor(value: Date | undefined) {
        this._value = value;
    }
}
