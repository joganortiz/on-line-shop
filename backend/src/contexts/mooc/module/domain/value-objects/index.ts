import { uuidValid } from '@src/contexts/shared/domain/services/uuidValidate';

export class ModuleId extends uuidValid {
    constructor(value: string) {
        super(value, 'id module');
    }
}

export class ModuleTitle {
    readonly _value: string;
    constructor(value: string) {
        this._value = value;
    }
}

export class ModuleOrder {
    readonly _value: number;
    constructor(value: number) {
        this._value = value;
    }
}

export class ModuleIcon {
    readonly _value: string;
    constructor(value: string) {
        this._value = value;
    }
}

export class ModuleChildren {
    readonly _value: string;
    constructor(value: string) {
        this._value = value;
    }
}

export class ModuleCreate {
    readonly _value?: Date;
    constructor(value?: Date) {
        this._value = value;
    }
}
