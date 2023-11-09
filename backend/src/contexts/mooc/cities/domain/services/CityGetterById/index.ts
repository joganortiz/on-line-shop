import { type City } from '../../City';
import { type CityRepository } from '../../CityRepository';
import { CityNotFoundException } from '../../exceptions';
import { CityId } from '../../value-objects';

export class CityGetterById {
    private readonly _cityRepository: CityRepository;

    constructor(cityRepository: CityRepository) {
        this._cityRepository = cityRepository;
    }

    /**
     * @description Exist City By Id
     * @date 11/6/2023 - 7:16:28 PM
     * @author Jogan Ortiz Muñoz
     *
     * @async
     * @param {string} idCity
     * @returns {Promise<City>}
     */
    async run(idCity: string): Promise<City> {
        const cityId = new CityId(idCity);
        const city = await this._cityRepository.getById(cityId);

        if (city === null) {
            throw new CityNotFoundException();
        }

        return city;
    }
}
