import { type Client } from '../../Client';
import { type ClientRepository } from '../../ClientRepository';
import { ClientNotFoundException } from '../../exceptions';
import { ClientId } from '../../value-object';

export class ClientGetterById {
    private readonly _clientRepository: ClientRepository;

    constructor(userRepository: ClientRepository) {
        this._clientRepository = userRepository;
    }

    async run(id: string): Promise<Client> {
        const idClient = new ClientId(id);
        const user = await this._clientRepository.getById(idClient);

        if (user === null) throw new ClientNotFoundException();

        return user;
    }
}
