import { ModelRoot } from '@src/contexts/shared/domain';
import { Country } from '../../countries/domain/Country';
import { type PrimitiveState, type valueObject } from './interfaces';
import { StateId } from './value-objects';
import { StateIso2 } from './value-objects/StateIso2';
import { StateName } from './value-objects/StateName';

export class State extends ModelRoot<PrimitiveState> {
    readonly _id: StateId;
    readonly name: StateName;
    readonly iso2?: StateIso2;
    readonly country?: Country;

    constructor(dataClass: valueObject) {
        super();
        this._id = dataClass._id;
        this.name = dataClass.name;
        this.iso2 = dataClass?.iso2;
        this.country = dataClass.country;
    }

    static fromPrimitives({ _id, name, iso2, country }: PrimitiveState): State {
        return new State({
            _id: new StateId(_id),
            name: new StateName(name),
            iso2: new StateIso2(iso2),
            country:
                country !== undefined
                    ? Country.fromPrimitives(country)
                    : undefined
        });
    }

    toPrimitives(): PrimitiveState {
        return {
            _id: this._id._value,
            name: this.name._value,
            iso2: this.iso2?._value,
            country: this.country?.toPrimitives()
        };
    }
}
