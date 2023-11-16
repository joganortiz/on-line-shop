import { StateId } from '@src/contexts/mooc/states/domain/value-objects';
import { type City } from '../../City';
import { type CityRepository } from '../../CityRepository';
import { CountryId } from '@src/contexts/mooc/countries/domain/value-objects';
import { CityId } from '../../value-objects';
import { CityNotFoundByIdStateAndIdCountryException } from '../../exceptions';

export class CityGetterByIdAndIdStateAndIdCountry {
    private readonly _cityRepository: CityRepository;
    constructor(cityRepository: CityRepository) {
        this._cityRepository = cityRepository;
    }

    async run(id: string, idState: string, idCountry: string): Promise<City> {
        const cityId = new CityId(id);
        const stateId = new StateId(idState);
        const countryId = new CountryId(idCountry);
        const country =
            await this._cityRepository.getByIdAndIdStateAndIdCountry(
                cityId,
                stateId,
                countryId
            );

        if (country === null) {
            throw new CityNotFoundByIdStateAndIdCountryException();
        }

        return country;
    }
}
