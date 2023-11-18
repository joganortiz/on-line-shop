import { type Client } from '../../domain/Client';
import { type ClientRepository } from '../../domain/ClientRepository';
import { ClientNotFoundException } from '../../domain/exceptions';
import { type PrimitiveClient } from '../../domain/interfaces';
import { ClientId } from '../../domain/value-object';

export class ClientGetterByIdUseCase {
    private readonly _clientRepository: ClientRepository;
    constructor(clientRepository: ClientRepository) {
        this._clientRepository = clientRepository;
    }

    run = async (id: string): Promise<PrimitiveClient> => {
        const idClient = new ClientId(id);
        const result: Client | null =
            await this._clientRepository.getById(idClient);

        if (result === null) throw new ClientNotFoundException();

        const resultDataPrimitives = result.toPrimitives();

        return resultDataPrimitives;
    };
}
