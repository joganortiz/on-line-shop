import { Client } from '../../domain/Client';
import { type ClientRepository } from '../../domain/ClientRepository';
import { CountryGetterById } from '@src/contexts/mooc/countries/domain/services';
import { StateGetterByIdAndIdCountry } from '@src/contexts/mooc/states/domain/services';
import { CityGetterByIdAndIdStateAndIdCountry } from '@src/contexts/mooc/cities/domain/services';
import { type BcryptRepository } from '@src/contexts/shared/domain/plugins/BcryptRepository';
import {
    ExistClientByUserName,
    ClientGetterById,
    ExistClientByEmail,
    ExistClientByIdentity,
    ExistClientByPhone
} from '../../domain/services';
import { type FileSystemRepository } from '@src/contexts/shared/domain/plugins/FileSystemRepository';
import { type CountryRepository } from '@src/contexts/mooc/countries/domain/CountryRepository';
import { type StateRepository } from '@src/contexts/mooc/states/domain/StateRepository';
import { type CityRepository } from '@src/contexts/mooc/cities/domain/CityRepository';
import {
    type ClientCommand,
    type PrimitiveClient
} from '../../domain/interfaces';
import { CountrySelectFirstException } from '@src/contexts/mooc/countries/domain/exceptions';
import { StateSelectFirstException } from '@src/contexts/mooc/states/domain/exceptions';
import {
    ClientEmailAlreadyExistsException,
    ClientIdentityAlreadyExistsException,
    ClientPhoneAlreadyExistsException,
    ClientUserNameAlreadyExistsException
} from '../../domain/exceptions';

export class ClientUpdateUseCase {
    private readonly _clientRepository: ClientRepository;
    private readonly _countryGetterById: CountryGetterById;
    private readonly _stateGetterByIdAndCountry: StateGetterByIdAndIdCountry;
    private readonly _cityGetterByIdAndIdStateAndIdCountry: CityGetterByIdAndIdStateAndIdCountry;
    private readonly _bcrypt: BcryptRepository;
    private readonly _existClientByUserName: ExistClientByUserName;
    private readonly _existClientByIdentity: ExistClientByIdentity;
    private readonly _existClientByEmail: ExistClientByEmail;
    private readonly _existClientByPhone: ExistClientByPhone;
    private readonly _fileSistem: FileSystemRepository;
    private readonly _clientGetterById: ClientGetterById;
    constructor(
        clientRepository: ClientRepository,
        countryRepository: CountryRepository,
        stateRepository: StateRepository,
        cityRepository: CityRepository,
        bcrypt: BcryptRepository,
        fileSistem: FileSystemRepository
    ) {
        this._clientRepository = clientRepository;
        this._countryGetterById = new CountryGetterById(countryRepository);
        this._stateGetterByIdAndCountry = new StateGetterByIdAndIdCountry(
            stateRepository
        );
        this._cityGetterByIdAndIdStateAndIdCountry =
            new CityGetterByIdAndIdStateAndIdCountry(cityRepository);
        this._existClientByUserName = new ExistClientByUserName(
            clientRepository
        );
        this._existClientByIdentity = new ExistClientByIdentity(
            clientRepository
        );
        this._existClientByEmail = new ExistClientByEmail(clientRepository);
        this._existClientByPhone = new ExistClientByPhone(clientRepository);
        this._fileSistem = fileSistem;
        this._clientGetterById = new ClientGetterById(clientRepository);
        this._bcrypt = bcrypt;
    }

    run = async (
        id: string,
        dataClient: ClientCommand
    ): Promise<PrimitiveClient> => {
        const client = await this._clientGetterById.run(id);

        let country;
        let state;
        let city;

        // process if a country exists
        if (dataClient.country !== undefined && dataClient.country != null) {
            country = await this._countryGetterById.run(dataClient.country);
        }

        // process if a state exists
        if (dataClient.state !== undefined && dataClient.state !== null) {
            if (
                (dataClient.country === undefined ||
                    dataClient.country == null) &&
                (client.country?._id._value === undefined ||
                    client.country?._id._value === null)
            )
                throw new CountrySelectFirstException();

            // We check the status by id and country id
            state = await this._stateGetterByIdAndCountry.run(
                dataClient.state,
                dataClient.country ?? client.country?._id._value
            );
        }

        // process if a city exists
        if (dataClient.city !== undefined && dataClient.city !== null) {
            if (
                (dataClient.state === undefined || dataClient.state == null) &&
                (client.state?._id._value === undefined ||
                    client.state?._id._value === null) &&
                (dataClient.country === undefined ||
                    dataClient.country == null) &&
                (client.country?._id._value === undefined ||
                    client.country?._id._value === null)
            )
                throw new StateSelectFirstException();

            city = await this._cityGetterByIdAndIdStateAndIdCountry.run(
                dataClient.city,
                dataClient.state ?? client.state?._id._value,
                dataClient.country ?? client.country?._id._value
            );
        }

        const password = await this._bcrypt.cryptPassword(dataClient.password);

        const clientUpdate = Client.fromPrimitives({
            _id: client._id._value,
            userName: dataClient.userName ?? client.userName._value,
            name: dataClient.name ?? client.name._value,
            lastName: dataClient.lastName ?? client.lastName._value,
            email: dataClient.email ?? client.email._value,
            identity: dataClient.identity ?? client.identity?._value,
            password: password === '' ? (undefined as any) : password,
            address: dataClient.address ?? client.address?._value,
            phone: dataClient.phone ?? client.phone?._value,
            codePhone: dataClient.codePhone ?? client.codePhone?._value,
            status: dataClient.status ?? client.status._value,
            country: country?.toPrimitives() ?? client.country?.toPrimitives(),
            state: state?.toPrimitives() ?? client.state?.toPrimitives(),
            city: city?.toPrimitives() ?? client.city?.toPrimitives()
        });

        // validate if the username already exists
        const existUserName: boolean = await this._existClientByUserName.run(
            clientUpdate.userName._value,
            client._id._value
        );

        if (existUserName) throw new ClientUserNameAlreadyExistsException();

        // validate if the id already exists
        const existIdentity: boolean = await this._existClientByIdentity.run(
            clientUpdate.identity?._value ?? '',
            client._id._value
        );

        if (existIdentity) throw new ClientIdentityAlreadyExistsException();

        // validate if the email exists
        const existEmail: boolean = await this._existClientByEmail.run(
            client.email._value,
            clientUpdate._id._value
        );

        if (existEmail) throw new ClientEmailAlreadyExistsException();

        // validate if the phone exists
        const existPhone: boolean = await this._existClientByPhone.run(
            clientUpdate.phone?._value ?? '',
            client._id._value
        );

        if (existPhone) throw new ClientPhoneAlreadyExistsException();

        // if everything goes well we update the client
        await this._clientRepository.update(client._id, clientUpdate);

        if (client.profilePicture?._value !== undefined) {
            this._fileSistem.removeImg(client.profilePicture?._value);
        }

        if (dataClient.img !== undefined) {
            const image = await this._fileSistem.saveImg(
                dataClient.img,
                'clients',
                client._id._value
            );

            const updateImg: PrimitiveClient = {} as PrimitiveClient;
            updateImg.profilePicture = image;
            updateImg._id = client._id._value;

            const UpdateImgById = Client.fromPrimitives(updateImg);
            await this._clientRepository.update(client._id, UpdateImgById);
        }

        // we get the client data again
        const getterClientUpdate = await this._clientGetterById.run(
            client._id._value
        );

        return getterClientUpdate.toPrimitives();
    };
}
