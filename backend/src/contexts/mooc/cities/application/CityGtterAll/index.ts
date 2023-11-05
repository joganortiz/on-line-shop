import { type City } from '../../domain/City';
import { type CityRepository } from '../../domain/CityRepository';
import { type PrimitiveCity } from '../../domain/interfaces';

export class CityGetterAllUseCase {
    private readonly _cityRepository: CityRepository;
    constructor(cityRepository: CityRepository) {
        this._cityRepository = cityRepository;
    }

    run = async ({
        start,
        limit
    }: {
        start?: string;
        limit?: string;
    }): Promise<PrimitiveCity[]> => {
        start = start ?? '0';
        limit = limit ?? '0';

        const result: City[] = await this._cityRepository.getAll(
            parseInt(start) ?? 0,
            parseInt(limit) ?? 0
        ); // result citys

        const resultDataPrimitives = result.map((city: City) =>
            city.toPrimitives()
        );

        return resultDataPrimitives;
    };
}
