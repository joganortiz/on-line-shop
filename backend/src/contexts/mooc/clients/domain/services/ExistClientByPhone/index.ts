import { type ClientRepository } from '../../ClientRepository';
import { ClientId, ClientPhone } from '../../value-object';

export class ExistClientByPhone {
    private readonly _clientRepository: ClientRepository;
    constructor(clientRepository: ClientRepository) {
        this._clientRepository = clientRepository;
    }

    async run(phone: string, idClient: string): Promise<boolean> {
        if (phone === undefined || phone === null || phone === '') return false;

        const id = new ClientId(idClient);
        const clientPhone: ClientPhone = new ClientPhone(phone);

        const client = await this._clientRepository.getByPhoneAndIgnoreId(
            clientPhone,
            id
        );

        if (client !== null) return true;

        return false;
    }
}
