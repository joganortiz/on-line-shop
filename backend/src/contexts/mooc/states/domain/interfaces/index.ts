import { type Country } from '@src/contexts/mooc/countries/domain/Country';
import { type StateId } from '../value-objects';
import { type StateIso2 } from '../value-objects/StateIso2';
import { type StateName } from '../value-objects/StateName';
import { type PrimitiveCountry } from '@src/contexts/mooc/countries/domain/interfaces';

export interface PrimitiveState {
    _id: string;
    name: string;
    iso2?: string;
    country?: PrimitiveCountry;
}

export interface valueObject {
    _id: StateId;
    name: StateName;
    iso2?: StateIso2;
    country?: Country;
}
