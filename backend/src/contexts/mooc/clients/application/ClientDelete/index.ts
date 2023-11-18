import { type ClientRepository } from '../../domain/ClientRepository';
import { type PrimitiveClient } from '../../domain/interfaces';
import { ClientGetterById } from '../../domain/services';

export class ClientDeleteUseCase {
    private readonly _userRepository: ClientRepository;
    private readonly _clientGetterById: ClientGetterById;
    constructor(clientRepository: ClientRepository) {
        this._userRepository = clientRepository;
        this._clientGetterById = new ClientGetterById(clientRepository);
    }

    run = async (id: string): Promise<PrimitiveClient> => {
        const clientToDelete = await this._clientGetterById.run(id);

        // if the user exists we proceed to delete it
        await this._userRepository.delete(clientToDelete._id);

        return { ...clientToDelete.toPrimitives(), status: '0' };
    };
}
