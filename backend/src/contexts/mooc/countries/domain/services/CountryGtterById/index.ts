import { type Country } from '../../Country';
import { type CountryRepository } from '../../CountryRepository';
import { CountryNotFoundException } from '../../exceptions/CountryNotFoundException';
import { CountryId } from '../../value-objects';

export class CountryGetterById {
    private readonly _countryRepository: CountryRepository;
    constructor(countryRepository: CountryRepository) {
        this._countryRepository = countryRepository;
    }

    async run(id: string): Promise<Country> {
        const idCountry = new CountryId(id);
        const country = await this._countryRepository.getById(idCountry);

        if (country === null) {
            throw new CountryNotFoundException();
        }

        return country;
    }
}
