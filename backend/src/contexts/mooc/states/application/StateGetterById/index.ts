import { type State } from '../../domain/State';
import { type StateRepository } from '../../domain/StateRepository';
import { StateNotFoundException } from '../../domain/exceptions';
import { type PrimitiveState } from '../../domain/interfaces';
import { StateId } from '../../domain/value-objects';

export class StateGetterByIdUseCase {
    private readonly _stateRepository: StateRepository;
    constructor(stateRepository: StateRepository) {
        this._stateRepository = stateRepository;
    }

    run = async (id: string): Promise<PrimitiveState> => {
        const result: State | null = await this._stateRepository.getById(
            new StateId(id)
        ); // result state

        if (result === null) {
            throw new StateNotFoundException();
        }

        return result.toPrimitives();
    };
}
