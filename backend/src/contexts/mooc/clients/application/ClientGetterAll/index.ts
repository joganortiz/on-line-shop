import { type Client } from '../../domain/Client';
import { type ClientRepository } from '../../domain/ClientRepository';
import { type PrimitiveClient } from '../../domain/interfaces';

export class ClientGetterAllUseCase {
    private readonly _clientRepository: ClientRepository;
    constructor(clientRepository: ClientRepository) {
        this._clientRepository = clientRepository;
    }

    run = async (
        query: any
    ): Promise<{ total: number; data: PrimitiveClient[] }> => {
        const result = await this._clientRepository.getAll(
            parseInt(query.start ?? 0),
            parseInt(query.limit ?? 0)
        );

        const resultDataPrimitives = result.clients.map((client: Client) =>
            client.toPrimitives()
        );

        return { total: result.total, data: resultDataPrimitives };
    };
}
