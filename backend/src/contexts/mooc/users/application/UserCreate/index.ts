import { type UuidRepository } from '@src/contexts/shared/domain/plugins/UuidRepository';
import { type UserRepository } from '../../domain/UserRepository';
import { RoleGetterById } from '@src/contexts/mooc/roles/domain/services/RoleGetterById';
import { CountryGetterById } from '@src/contexts/mooc/countries/domain/services';
import { StateGetterByIdAndIdCountry } from '@src/contexts/mooc/states/domain/services';
import { CityGetterByIdAndIdStateAndIdCountry } from '@src/contexts/mooc/cities/domain/services';
import { type RoleRepository } from '@src/contexts/mooc/roles/domain';
import { type CountryRepository } from '@src/contexts/mooc/countries/domain/CountryRepository';
import { type StateRepository } from '@src/contexts/mooc/states/domain/StateRepository';
import { type CityRepository } from '@src/contexts/mooc/cities/domain/CityRepository';
import { User } from '../../domain/User';
import { type BcryptRepository } from '@src/contexts/shared/domain/plugins/BcryptRepository';
import {
    ExistUserByIdentity,
    ExistUserByUserName,
    ExistUserByEmail,
    ExistUserByPhone
} from '../../domain/services';
import {
    IdentityAlreadyExistsException,
    UserEmailAlreadyExistsException,
    UserNameAlreadyExistsException,
    UserPhoneAlreadyExistsException
} from '../../domain/exceptions';
import { type PrimitiveUser, type UserCommand } from '../../domain/interfaces';
import { type FileSystemRepository } from '@src/contexts/shared/domain/plugins/FileSystemRepository';
import { UserProfilePicture } from '../../domain/value-objects';
import { CountrySelectFirstException } from '@src/contexts/mooc/countries/domain/exceptions';
import { StateSelectFirstException } from '@src/contexts/mooc/states/domain/exceptions';

export class UserCreateUseCase {
    private readonly _userRepository: UserRepository;
    private readonly _uuidGenerator: UuidRepository;
    private readonly _roleGetterById: RoleGetterById;
    private readonly _countryGetterById: CountryGetterById;
    private readonly _stateGetterByIdAndCountry: StateGetterByIdAndIdCountry;
    private readonly _cityGetterByIdAndIdStateAndIdCountry: CityGetterByIdAndIdStateAndIdCountry;
    private readonly _bcrypt: BcryptRepository;
    private readonly _existUserByUserName: ExistUserByUserName;
    private readonly _existUserByIdentity: ExistUserByIdentity;
    private readonly _existUserByEmail: ExistUserByEmail;
    private readonly _existUserByPhone: ExistUserByPhone;
    private readonly _fileSistem: FileSystemRepository;
    constructor(
        userRepository: UserRepository,
        roleRepository: RoleRepository,
        countryRepository: CountryRepository,
        stateRepository: StateRepository,
        cityRepository: CityRepository,
        uuidGenerator: UuidRepository,
        bcrypt: BcryptRepository,
        fileSistem: FileSystemRepository
    ) {
        this._userRepository = userRepository;
        this._uuidGenerator = uuidGenerator;
        this._bcrypt = bcrypt;
        this._roleGetterById = new RoleGetterById(roleRepository);
        this._countryGetterById = new CountryGetterById(countryRepository);
        this._stateGetterByIdAndCountry = new StateGetterByIdAndIdCountry(
            stateRepository
        );
        this._cityGetterByIdAndIdStateAndIdCountry =
            new CityGetterByIdAndIdStateAndIdCountry(cityRepository);
        this._existUserByUserName = new ExistUserByUserName(userRepository);
        this._existUserByIdentity = new ExistUserByIdentity(userRepository);
        this._existUserByEmail = new ExistUserByEmail(userRepository);
        this._existUserByPhone = new ExistUserByPhone(userRepository);
        this._fileSistem = fileSistem;
    }

    run = async (dataUser: UserCommand): Promise<PrimitiveUser> => {
        let country;
        let state;
        let city;

        // process if a country exists
        if (dataUser.country !== undefined && dataUser.country != null) {
            country = await this._countryGetterById.run(dataUser.country);
        }

        // process if a state exists
        if (dataUser.state !== undefined && dataUser.state !== null) {
            if (dataUser.country === undefined || dataUser.country == null)
                throw new CountrySelectFirstException();

            // We check the status by id and country id
            state = await this._stateGetterByIdAndCountry.run(
                dataUser.state,
                dataUser.country
            );
        }

        // process if a city exists
        if (dataUser.city !== undefined && dataUser.city !== null) {
            if (dataUser.state === undefined || dataUser.state == null)
                throw new StateSelectFirstException();

            city = await this._cityGetterByIdAndIdStateAndIdCountry.run(
                dataUser.city,
                dataUser.state,
                dataUser.country
            );
        }

        // get the role data
        const role = await this._roleGetterById.run(dataUser.idRole);
        const user = User.create({
            _id: await this._uuidGenerator.generate(),
            userName: dataUser.userName,
            name: dataUser.name,
            lastName: dataUser.lastName,
            email: dataUser.email,
            identity: dataUser.identity,
            password: await this._bcrypt.cryptPassword(dataUser.password),
            address: dataUser.address,
            phone: dataUser.phone,
            codePhone: dataUser.codePhone,
            status: dataUser.status,
            country: country?.toPrimitives(),
            state: state?.toPrimitives(),
            city: city?.toPrimitives(),
            role: role.toPrimitives()
        });

        // validate if the user already exists
        const existUserName: boolean = await this._existUserByUserName.run(
            user._id._value,
            user.userName._value
        );

        if (existUserName) throw new UserNameAlreadyExistsException();

        // validate if the id already exists
        const existIdentity: boolean = await this._existUserByIdentity.run(
            user._id._value,
            user.identity?._value
        );

        if (existIdentity) throw new IdentityAlreadyExistsException();

        // validate if the email exists
        const existEmail: boolean = await this._existUserByEmail.run(
            user.email._value,
            user._id._value
        );

        if (existEmail) throw new UserEmailAlreadyExistsException();

        // validate if the phone exists
        const existPhone: boolean = await this._existUserByPhone.run(
            user._id._value,
            user.phone?._value
        );

        if (existPhone) throw new UserPhoneAlreadyExistsException();

        // if everything goes well we save the user
        await this._userRepository.save(user);

        if (dataUser.img !== undefined) {
            const image = await this._fileSistem.saveImg(
                dataUser.img,
                'users',
                user._id._value
            );

            await this._userRepository.updateProfileById(
                user._id,
                new UserProfilePicture(image)
            );
        }

        const newUser = await this._userRepository.getById(user._id);

        if (newUser == null) throw new Error('error');

        return newUser.toPrimitives();
    };
}
