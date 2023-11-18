import { type ClientRepository } from '../../ClientRepository';
import { ClientId, ClientIdentity } from '../../value-object';

export class ExistClientByIdentity {
    private readonly _clientRepository: ClientRepository;
    constructor(clientRepository: ClientRepository) {
        this._clientRepository = clientRepository;
    }

    async run(identity: string, idClient: string): Promise<boolean> {
        if (identity === undefined || identity === null || identity === '')
            return false;

        const id = new ClientId(idClient);
        const clientIdentity = new ClientIdentity(identity);

        const client = await this._clientRepository.getByIdentityAndIgnoreId(
            clientIdentity,
            id
        );

        if (client !== null) return true;

        return false;
    }
}
