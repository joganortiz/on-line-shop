import {
    type CountryTld,
    type CountryCurrency,
    type CountryCurrencyName,
    type CountryCurrencySymbol,
    type CountryId,
    type CountryIso2,
    type CountryIso3,
    type CountryName,
    type CountryPhoneCode,
    type CountryCapital
} from '../value-objects';
import { type CountryFlag } from '../value-objects/CountryFlag';

export interface PrimitiveCountry {
    _id: string;
    name: string;
    iso2: string;
    iso3: string;
    phoneCode: string;
    currency: string;
    currencyName: string;
    currencySymbol: string;
    flag: string;
    capital?: string;
    tld: string;
}

export interface valueObject {
    _id: CountryId;
    name: CountryName;
    iso2: CountryIso2;
    iso3: CountryIso3;
    phoneCode: CountryPhoneCode;
    currency: CountryCurrency;
    currencyName: CountryCurrencyName;
    currencySymbol: CountryCurrencySymbol;
    flag: CountryFlag;
    tld: CountryTld;
    capital?: CountryCapital;
}
