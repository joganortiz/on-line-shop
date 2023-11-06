import { StateGetterById } from '@src/contexts/mooc/states/domain/services';
import { type City } from '../../domain/City';
import { type CityRepository } from '../../domain/CityRepository';
import { type PrimitiveCity } from '../../domain/interfaces';
import { type StateRepository } from '@src/contexts/mooc/states/domain/StateRepository';

export class CityGetterAllByIdStateUseCase {
    private readonly _cityRepository: CityRepository;
    private readonly _stateGetterById: StateGetterById;
    constructor(
        cityRepository: CityRepository,
        stateRepository: StateRepository
    ) {
        this._cityRepository = cityRepository;
        this._stateGetterById = new StateGetterById(stateRepository);
    }

    run = async (
        idState: string,
        {
            start,
            limit
        }: {
            start?: string;
            limit?: string;
        }
    ): Promise<{ total: number; data: PrimitiveCity[] }> => {
        start = start ?? '0';
        limit = limit ?? '0';

        const state = await this._stateGetterById.run(idState);

        const result = await this._cityRepository.getAllByIdState(
            state._id,
            parseInt(start) ?? 0,
            parseInt(limit) ?? 0
        ); // result citys By Id State

        const resultDataPrimitives = result.cities.map((city: City) =>
            city.toPrimitives()
        );

        return { total: result.total, data: resultDataPrimitives };
    };
}
