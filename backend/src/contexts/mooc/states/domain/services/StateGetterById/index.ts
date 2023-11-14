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
        const idState = new StateId(id);
        const state = await this._stateyRepository.getById(idState);

        if (state === null) {
            throw new StateNotFoundException();
        }

        return state;
    }
}
