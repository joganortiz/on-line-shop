import { type UuidRepository } from '@src/contexts/shared/domain/plugins/UuidRepository';
import { type ClientRepository } from '../../domain/ClientRepository';
import { CountryGetterById } from '@src/contexts/mooc/countries/domain/services';
import { StateGetterByIdAndIdCountry } from '@src/contexts/mooc/states/domain/services';
import { CityGetterByIdAndIdStateAndIdCountry } from '@src/contexts/mooc/cities/domain/services';
import { type BcryptRepository } from '@src/contexts/shared/domain/plugins/BcryptRepository';
import { type CountryRepository } from '@src/contexts/mooc/countries/domain/CountryRepository';
import { type StateRepository } from '@src/contexts/mooc/states/domain/StateRepository';
import { type CityRepository } from '@src/contexts/mooc/cities/domain/CityRepository';
import {
    type ClientCommand,
    type PrimitiveClient
} from '../../domain/interfaces';
import { CountrySelectFirstException } from '@src/contexts/mooc/countries/domain/exceptions';
import { StateSelectFirstException } from '@src/contexts/mooc/states/domain/exceptions';
import { Client } from '../../domain/Client';
import {
    ExistClientByEmail,
    ExistClientByIdentity,
    ExistClientByPhone,
    ExistClientByUserName
} from '../../domain/services';
import { ClientUserNameAlreadyExistsException } from '../../domain/exceptions';
import {
    IdentityAlreadyExistsException,
    UserEmailAlreadyExistsException,
    UserPhoneAlreadyExistsException
} from '@src/contexts/mooc/users/domain/exceptions';

export class ClientCreateUseCase {
    private readonly _clientRepository: ClientRepository;
    private readonly _uuidGenerator: UuidRepository;
    private readonly _countryGetterById: CountryGetterById;
    private readonly _stateGetterByIdAndCountry: StateGetterByIdAndIdCountry;
    private readonly _cityGetterByIdAndIdStateAndIdCountry: CityGetterByIdAndIdStateAndIdCountry;
    private readonly _bcrypt: BcryptRepository;
    private readonly _existClientByUserName: ExistClientByUserName;
    private readonly _existClientByIdentity: ExistClientByIdentity;
    private readonly _existClientByEmail: ExistClientByEmail;
    private readonly _existClientByPhone: ExistClientByPhone;
    constructor(
        clientRepository: ClientRepository,
        countryRepository: CountryRepository,
        stateRepository: StateRepository,
        cityRepository: CityRepository,
        uuidGenerator: UuidRepository,
        bcrypt: BcryptRepository
    ) {
        this._clientRepository = clientRepository;
        this._uuidGenerator = uuidGenerator;
        this._bcrypt = bcrypt;
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
    }

    run = async (dataClient: ClientCommand): Promise<PrimitiveClient> => {
        let country;
        let state;
        let city;

        // process if a country exists
        if (dataClient.country !== undefined && dataClient.country != null) {
            country = await this._countryGetterById.run(dataClient.country);
        }

        // process if a state exists
        if (dataClient.state !== undefined && dataClient.state !== null) {
            if (dataClient.country === undefined || dataClient.country == null)
                throw new CountrySelectFirstException();

            // We check the status by id and country id
            state = await this._stateGetterByIdAndCountry.run(
                dataClient.state,
                dataClient.country
            );
        }

        // process if a city exists
        if (dataClient.city !== undefined && dataClient.city !== null) {
            if (dataClient.state === undefined || dataClient.state == null)
                throw new StateSelectFirstException();

            city = await this._cityGetterByIdAndIdStateAndIdCountry.run(
                dataClient.city,
                dataClient.state,
                dataClient.country
            );
        }

        // get the role data
        const client = Client.create({
            _id: await this._uuidGenerator.generate(),
            userName: dataClient.userName,
            name: dataClient.name,
            lastName: dataClient.lastName,
            email: dataClient.email,
            identity: dataClient.identity,
            password: await this._bcrypt.cryptPassword(dataClient.password),
            address: dataClient.address,
            phone: dataClient.phone,
            codePhone: dataClient.codePhone,
            status: dataClient.status,
            country: country?.toPrimitives(),
            state: state?.toPrimitives(),
            city: city?.toPrimitives()
        });

        // validate if the user already exists
        const existUserName: boolean = await this._existClientByUserName.run(
            client.userName._value,
            client._id._value
        );

        if (existUserName) throw new ClientUserNameAlreadyExistsException();

        // validate if the id already exists
        const existIdentity: boolean = await this._existClientByIdentity.run(
            client.identity?._value ?? '',
            client._id._value
        );

        if (existIdentity) throw new IdentityAlreadyExistsException();

        // validate if the email exists
        const existEmail: boolean = await this._existClientByEmail.run(
            client.email._value,
            client._id._value
        );

        if (existEmail) throw new UserEmailAlreadyExistsException();

        // validate if the phone exists
        const existPhone: boolean = await this._existClientByPhone.run(
            client.phone?._value ?? '',
            client._id._value
        );

        if (existPhone) throw new UserPhoneAlreadyExistsException();

        // if everything goes well we save the user
        await this._clientRepository.save(client);

        const newClient = await this._clientRepository.getById(client._id);

        if (newClient == null) throw new Error('error');

        return newClient.toPrimitives();
    };
}
