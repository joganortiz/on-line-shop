import { ModelRoot } from '@src/contexts/shared/domain';
import { Country } from '../../countries/domain/Country';
import { State } from '../../states/domain/State';
import { type PrimitiveCity, type valueObject } from './interfaces';
import { CityId, CityName } from './value-objects';

export class City extends ModelRoot<PrimitiveCity> {
    private readonly _id: CityId;
    private readonly name: CityName;
    private readonly country: Country;
    private readonly state: State;

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
            state: State.fromPrimitives(state),
            country: Country.fromPrimitives(country)
        });
    }

    toPrimitives(): PrimitiveCity {
        return {
            _id: this._id._value,
            name: this.name._value,
            country: this.country.toPrimitives(),
            state: this.state.toPrimitives()
        };
    }
}
