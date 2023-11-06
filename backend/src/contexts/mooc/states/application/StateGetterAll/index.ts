import { type State } from '../../domain/State';
import { type StateRepository } from '../../domain/StateRepository';
import { type PrimitiveState } from '../../domain/interfaces';

export class StateGetterAllUseCase {
    private readonly _stateRepository: StateRepository;
    constructor(stateRepository: StateRepository) {
        this._stateRepository = stateRepository;
    }

    run = async ({
        start,
        limit
    }: {
        start?: string;
        limit?: string;
    }): Promise<{ total: number; data: PrimitiveState[] }> => {
        start = start ?? '0';
        limit = limit ?? '0';

        const result = await this._stateRepository.getAll(
            parseInt(start) ?? 0,
            parseInt(limit) ?? 0
        ); // result states

        const resultDataPrimitives = result.states.map((state: State) =>
            state.toPrimitives()
        );

        return { total: result.total, data: resultDataPrimitives };
    };
}
