import { type ClientRepository } from '../../ClientRepository';
import { ClientId, ClientUserName } from '../../value-object';

export class ExistClientByUserName {
    private readonly _clientRepository: ClientRepository;
    constructor(clientRepository: ClientRepository) {
        this._clientRepository = clientRepository;
    }

    async run(username: string, idClient: string): Promise<boolean> {
        const id = new ClientId(idClient);
        const userName = new ClientUserName(username);

        const client = await this._clientRepository.getByUserNameAndIgnoreId(
            userName,
            id
        );

        if (client !== null) return true;

        return false;
    }
}
