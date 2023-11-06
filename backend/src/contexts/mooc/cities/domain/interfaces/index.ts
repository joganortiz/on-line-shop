import { type PrimitiveCountry } from '@src/contexts/mooc/countries/domain/interfaces';
import { type PrimitiveState } from '@src/contexts/mooc/states/domain/interfaces';
import { type CityId, type CityName } from '../value-objects';
import { type State } from '@src/contexts/mooc/states/domain/State';
import { type Country } from '@src/contexts/mooc/countries/domain/Country';

export interface PrimitiveCity {
    _id: string;
    name: string;
    country?: PrimitiveCountry;
    state?: PrimitiveState;
}

export interface valueObject {
    _id: CityId;
    name: CityName;
    state?: State;
    country?: Country;
}
