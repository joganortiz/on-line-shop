import { type Country } from '../../domain/Country';
import { type CountryRepository } from '../../domain/CountryRepository';
import { type PrimitiveCountry } from '../../domain/interfaces';

export class CountryGetterAllUseCase {
    private readonly _countryRepository: CountryRepository;
    constructor(countryRepository: CountryRepository) {
        this._countryRepository = countryRepository;
    }

    run = async ({
        start,
        limit
    }: {
        start?: string;
        limit?: string;
    }): Promise<PrimitiveCountry[]> => {
        start = start ?? '0';
        limit = limit ?? '0';

        const result: Country[] = await this._countryRepository.getAll(
            parseInt(start) ?? 0,
            parseInt(limit) ?? 0
        ); // result Countries

        const resultDataPrimitives = result.map((country: Country) =>
            country.toPrimitives()
        );

        return resultDataPrimitives;
    };
}
