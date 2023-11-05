import { ModelRoot } from '@src/contexts/shared/domain';
import {
    CountryCapital,
    CountryCurrency,
    CountryCurrencyName,
    CountryCurrencySymbol,
    CountryId,
    CountryIso2,
    CountryIso3,
    CountryName,
    CountryPhoneCode,
    CountryTld
} from './value-objects';
import { CountryFlag } from './value-objects/CountryFlag';
import { type PrimitiveCountry, type valueObject } from './interfaces';

export class Country extends ModelRoot<PrimitiveCountry> {
    readonly _id: CountryId;
    readonly name: CountryName;
    readonly iso2: CountryIso2;
    readonly iso3: CountryIso3;
    readonly phoneCode: CountryPhoneCode;
    readonly currency: CountryCurrency;
    readonly currencyName: CountryCurrencyName;
    readonly currencySymbol: CountryCurrencySymbol;
    readonly flag: CountryFlag;
    readonly capital?: CountryCapital;
    readonly tld: CountryTld;

    constructor(dataClass: valueObject) {
        super();
        this._id = dataClass._id;
        this.name = dataClass.name;
        this.iso2 = dataClass.iso2;
        this.iso3 = dataClass.iso3;
        this.phoneCode = dataClass.phoneCode;
        this.currency = dataClass.currency;
        this.currencyName = dataClass.currencyName;
        this.currencySymbol = dataClass.currencySymbol;
        this.flag = dataClass.flag;
        this.capital = dataClass.capital;
        this.tld = dataClass.tld;
    }

    static fromPrimitives({
        _id,
        name,
        iso2,
        iso3,
        phoneCode,
        currency,
        currencyName,
        currencySymbol,
        flag,
        capital,
        tld
    }: PrimitiveCountry): Country {
        return new Country({
            _id: new CountryId(_id),
            name: new CountryName(name),
            iso2: new CountryIso2(iso2),
            iso3: new CountryIso3(iso3),
            phoneCode: new CountryPhoneCode(phoneCode),
            currency: new CountryCurrency(currency),
            currencyName: new CountryCurrencyName(currencyName),
            currencySymbol: new CountryCurrencySymbol(currencySymbol),
            flag: new CountryFlag(flag),
            capital: new CountryCapital(capital),
            tld: new CountryTld(tld)
        });
    }

    toPrimitives(): PrimitiveCountry {
        return {
            _id: this._id._value,
            name: this.name._value,
            iso2: this.iso2._value,
            iso3: this.iso3._value,
            phoneCode: this.phoneCode._value,
            currency: this.currency._value,
            currencyName: this.currencyName._value,
            currencySymbol: this.currencySymbol._value,
            flag: this.flag._value,
            capital: this.capital?._value,
            tld: this.tld._value
        };
    }
}
