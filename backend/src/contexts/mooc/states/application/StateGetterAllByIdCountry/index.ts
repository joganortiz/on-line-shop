import { CountryGetterById } from '@src/contexts/mooc/countries/domain/services';
import { type StateRepository } from '../../domain/StateRepository';
import { type CountryRepository } from '@src/contexts/mooc/countries/domain/CountryRepository';
import { type PrimitiveState } from '../../domain/interfaces';
import { type State } from '../../domain/State';

export class StateGetterAllByIdCountryUseCase {
    private readonly _stateRepository: StateRepository;
    private readonly _countryGetterById: CountryGetterById;

    constructor(
        stateRepository: StateRepository,
        countryRepository: CountryRepository
    ) {
        this._stateRepository = stateRepository;
        this._countryGetterById = new CountryGetterById(countryRepository);
    }

    run = async (
        idCountry: string,
        {
            start,
            limit
        }: {
            start?: string;
            limit?: string;
        }
    ): Promise<PrimitiveState[]> => {
        start = start ?? '0';
        limit = limit ?? '0';

        const country = await this._countryGetterById.run(idCountry);

        const result: State[] = await this._stateRepository.getAllByIdCountry(
            country._id,
            parseInt(start) ?? 0,
            parseInt(limit) ?? 0
        ); // result states by id country

        const resultDataPrimitives = result.map((state: State) =>
            state.toPrimitives()
        );

        return resultDataPrimitives;
    };
}
