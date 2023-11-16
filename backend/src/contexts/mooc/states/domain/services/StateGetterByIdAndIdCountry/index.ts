import { CountryId } from '@src/contexts/mooc/countries/domain/value-objects';
import { type State } from '../../State';
import { type StateRepository } from '../../StateRepository';
import { StateId } from '../../value-objects';
import { StateNotFoundByIdCountryException } from '../../exceptions';

export class StateGetterByIdAndIdCountry {
    private readonly _stateyRepository: StateRepository;
    constructor(stateRepository: StateRepository) {
        this._stateyRepository = stateRepository;
    }

    async run(id: string, idCountry: string): Promise<State> {
        const stateId = new StateId(id);
        const countryId = new CountryId(idCountry);
        const state = await this._stateyRepository.getByIdAndIdCountry(
            stateId,
            countryId
        );

        if (state === null) {
            throw new StateNotFoundByIdCountryException();
        }

        return state;
    }
}
