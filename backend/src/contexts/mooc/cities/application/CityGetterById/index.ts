import { type City } from '../../domain/City';
import { type CityRepository } from '../../domain/CityRepository';
import { CityNotFoundException } from '../../domain/exceptions';
import { type PrimitiveCity } from '../../domain/interfaces';
import { CityId } from '../../domain/value-objects';

export class CityGetterByIdUseCase {
    private readonly _cityRepository: CityRepository;
    constructor(cityRepository: CityRepository) {
        this._cityRepository = cityRepository;
    }

    run = async (id: string): Promise<PrimitiveCity> => {
        const result: City | null = await this._cityRepository.getById(
            new CityId(id)
        ); // result city

        if (result === null) {
            throw new CityNotFoundException();
        }

        return result.toPrimitives();
    };
}
