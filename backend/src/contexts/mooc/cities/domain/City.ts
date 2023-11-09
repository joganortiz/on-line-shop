import { ModelRoot } from '@src/contexts/shared/domain';
import { Country } from '../../countries/domain/Country';
import { State } from '../../states/domain/State';
import { type PrimitiveCity, type valueObject } from './interfaces';
import { CityId, CityName } from './value-objects';

export class City extends ModelRoot<PrimitiveCity> {
    readonly _id: CityId;
    readonly name: CityName;
    readonly country?: Country;
    readonly state?: State;

    constructor(dataClass: valueObject) {
        super();
        this._id = dataClass._id;
        this.name = dataClass.name;
        this.country = dataClass.country;
        this.state = dataClass.state;
    }

    static fromPrimitives({ _id, name, country, state }: PrimitiveCity): City {
        return new City({
            _id: new CityId(_id),
            name: new CityName(name),
            state:
                state !== undefined ? State.fromPrimitives(state) : undefined,
            country:
                country !== undefined
                    ? Country.fromPrimitives(country)
                    : undefined
        });
    }

    toPrimitives(): PrimitiveCity {
        return {
            _id: this._id._value,
            name: this.name._value,
            state: this.state?.toPrimitives(),
            country: this.country?.toPrimitives()
        };
    }
}
