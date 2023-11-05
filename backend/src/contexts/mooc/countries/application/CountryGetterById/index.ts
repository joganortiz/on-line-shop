import { type Country } from '../../domain/Country';
import { type CountryRepository } from '../../domain/CountryRepository';
import { CountryNotFoundException } from '../../domain/exceptions/CountryNotFoundException';
import { type PrimitiveCountry } from '../../domain/interfaces';
import { CountryId } from '../../domain/value-objects';

export class CountryGetterByIdUseCase {
    private readonly _countryRepository: CountryRepository;
    constructor(countryRepository: CountryRepository) {
        this._countryRepository = countryRepository;
    }

    run = async (id: string): Promise<PrimitiveCountry> => {
        const result: Country | null = await this._countryRepository.getById(
            new CountryId(id)
        ); // result Countries

        if (result === null) {
            throw new CountryNotFoundException();
        }

        return result.toPrimitives();
    };
}
