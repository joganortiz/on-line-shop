import { type ClientRepository } from '../../ClientRepository';
import { ClientEmail, ClientId } from '../../value-object';

export class ExistClientByEmail {
    private readonly _clientRepository: ClientRepository;
    constructor(clientRepository: ClientRepository) {
        this._clientRepository = clientRepository;
    }

    async run(email: string, idClient: string): Promise<boolean> {
        const id = new ClientId(idClient);
        const clientEmail = new ClientEmail(email);

        const client = await this._clientRepository.getByEmailAndIgnoreId(
            clientEmail,
            id
        );

        if (client !== null) return true;

        return false;
    }
}
