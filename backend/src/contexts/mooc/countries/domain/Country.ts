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
    readonly iso2?: CountryIso2;
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

    // static create(data: PrimitiveCountry): Country {
    //     return new Country({
    //         _id: new CountryId(data._id),
    //         name: new CountryName(data.name),
    //         iso2: new CountryIso2(data.iso2),
    //         iso3: new CountryIso3(data.iso3),
    //         phoneCode: new CountryPhoneCode(data.phoneCode),
    //         currency: new CountryCurrency(data.currency),
    //         currencyName: new CountryCurrencyName(data.currencyName),
    //         currencySymbol: new CountryCurrencySymbol(data.currencySymbol),
    //         flag: new CountryFlag(data.flag),
    //         capital: new CountryCapital(data.capital),
    //         tld: new CountryTld(data.tld)
    //     });
    // }

    static fromPrimitives(data: PrimitiveCountry): Country {
        const country: valueObject = {} as valueObject;

        country._id = new CountryId(data._id);
        country.name = new CountryName(data.name);

        if (data.iso2 !== undefined) country.iso2 = new CountryIso2(data.iso2);
        if (data.iso3 !== undefined) country.iso3 = new CountryIso3(data.iso3);
        if (data.phoneCode !== undefined)
            country.phoneCode = new CountryPhoneCode(data.phoneCode);
        if (data.currency !== undefined)
            country.currency = new CountryCurrency(data.currency);
        if (data.currencyName !== undefined)
            country.currencyName = new CountryCurrencyName(data.currencyName);
        if (data.currencySymbol !== undefined)
            country.currencySymbol = new CountryCurrencySymbol(
                data.currencySymbol
            );
        if (data.flag !== undefined) country.flag = new CountryFlag(data.flag);
        if (data.capital !== undefined)
            country.capital = new CountryCapital(data.capital);
        if (data.tld !== undefined) country.tld = new CountryTld(data.tld);

        return new Country(country);
    }

    toPrimitives(): PrimitiveCountry {
        const primitive: PrimitiveCountry = {} as PrimitiveCountry;

        primitive._id = this._id._value;
        primitive.name = this.name._value;
        if (this.iso2 !== undefined) primitive.iso2 = this.iso2._value;
        if (this.iso3 !== undefined) primitive.iso3 = this.iso3._value;
        if (this.phoneCode !== undefined)
            primitive.phoneCode = this.phoneCode._value;
        if (this.currency !== undefined)
            primitive.currency = this.currency._value;
        if (this.currencyName !== undefined)
            primitive.currencyName = this.currencyName._value;
        if (this.currencySymbol !== undefined)
            primitive.currencySymbol = this.currencySymbol._value;
        if (this.flag !== undefined) primitive.flag = this.flag._value;
        if (this.capital !== undefined) primitive.capital = this.capital._value;
        if (this.tld !== undefined) primitive.tld = this.tld._value;

        return primitive;
    }
}
