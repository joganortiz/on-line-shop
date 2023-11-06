import { type StateRepository } from '../../StateRepository';
import { StateId } from '../../value-objects';
import { type State } from '../../State';
import { StateNotFoundException } from '../../exceptions';

export class StateGetterById {
    private readonly _stateyRepository: StateRepository;
    constructor(stateRepository: StateRepository) {
        this._stateyRepository = stateRepository;
    }

    async run(id: string): Promise<State> {
        const idCountry = new StateId(id);
        const country = await this._stateyRepository.getById(idCountry);

        if (country === null) {
            throw new StateNotFoundException();
        }

        return country;
    }
}
