import { type UuidRepository } from '@src/contexts/shared/domain/plugins/UuidRepository';
import { type UserRepository } from '../../domain/UserRepository';
import { RoleGetterById } from '@src/contexts/mooc/roles/domain/services/RoleGetterById';
import { CountryGetterById } from '@src/contexts/mooc/countries/domain/services';
import { StateGetterById } from '@src/contexts/mooc/states/domain/services';
import { CityGetterById } from '@src/contexts/mooc/cities/domain/services';
import { type RoleRepository } from '@src/contexts/mooc/roles/domain';
import { type CountryRepository } from '@src/contexts/mooc/countries/domain/CountryRepository';
import { type StateRepository } from '@src/contexts/mooc/states/domain/StateRepository';
import { type CityRepository } from '@src/contexts/mooc/cities/domain/CityRepository';
import type fileUpload from 'express-fileupload';
import { User } from '../../domain/User';
import {
    UserAddress,
    UserCodePhone,
    UserEmail,
    UserId,
    UserIdentity,
    UserLastName,
    UserName,
    UserPassword,
    UserPhone,
    UserStatus,
    UserUserName
} from '../../domain/value-objects';
import { type BcryptRepository } from '@src/contexts/shared/domain/plugins/BcryptRepository';

interface UserCreateCommand {
    name: string;
    lastName: string;
    userName: string;
    identity: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    codePhone: string;
    status: string;
    country: string;
    state: string;
    city: string;
    idRole: string;
    img?: fileUpload.UploadedFile;
}

export class UserCreateUseCase {
    private readonly _userRepository: UserRepository;
    private readonly _uuidGenerator: UuidRepository;
    private readonly _roleGetterById: RoleGetterById;
    private readonly _countryGetterById: CountryGetterById;
    private readonly _stateGetterById: StateGetterById;
    private readonly _cityGetterById: CityGetterById;
    private readonly _bcrypt: BcryptRepository;
    // private readonly _existUserByUserName: ExistUserByUserName;
    // private readonly _existUserByIdentity: ExistUserByIdentity;
    // private readonly _existUserByEmail: ExistUserByEmail;
    // private readonly _existUserByPhone: ExistUserByPhone;
    constructor(
        userRepository: UserRepository,
        roleRepository: RoleRepository,
        countryRepository: CountryRepository,
        stateRepository: StateRepository,
        cityRepository: CityRepository,
        uuidGenerator: UuidRepository,
        bcrypt: BcryptRepository
    ) {
        this._userRepository = userRepository;
        this._uuidGenerator = uuidGenerator;
        this._bcrypt = bcrypt;
        this._roleGetterById = new RoleGetterById(roleRepository);
        this._countryGetterById = new CountryGetterById(countryRepository);
        this._stateGetterById = new StateGetterById(stateRepository);
        this._cityGetterById = new CityGetterById(cityRepository);
        // this._existUserByUserName = new ExistUserByUserName(userRepository);
        // this._existUserByIdentity = new ExistUserByIdentity(userRepository);
        // this._existUserByEmail = new ExistUserByEmail(userRepository);
        // this._existUserByPhone = new ExistUserByPhone(userRepository);
    }

    run = async (dataUser: UserCreateCommand): Promise<any> => {
        let country;
        let state;
        let city;
        if (dataUser.country !== undefined && dataUser.country != null) {
            // get the country data
            country = await this._countryGetterById.run(dataUser.country);

            if (dataUser.state !== undefined) {
                // get the state data
                state = await this._stateGetterById.run(dataUser.state);
            }

            if (dataUser.city !== undefined && state !== undefined) {
                // get the city data
                city = await this._cityGetterById.run(dataUser.city);
            }
        }

        // get the role data
        const role = await this._roleGetterById.run(dataUser.idRole);

        const user = new User({
            _id: new UserId(await this._uuidGenerator.generate()),
            userName: new UserUserName(dataUser.userName),
            name: new UserName(dataUser.name),
            lastName: new UserLastName(dataUser.lastName),
            email: new UserEmail(dataUser.email),
            identity: new UserIdentity(dataUser.identity),
            password: new UserPassword(
                await this._bcrypt.cryptPassword(dataUser.password)
            ),
            address: new UserAddress(dataUser.address),
            phone: new UserPhone(dataUser.phone),
            codePhone: new UserCodePhone(dataUser.codePhone),
            status: new UserStatus(dataUser.status),
            country,
            state,
            city,
            role
        });

        // // validate if the user already exists
        // const existUserName: boolean = await this._existUserByUserName.run(
        //     user.userName._value,
        //     user._id._value
        // );

        // if (existUserName) throw new UserNameAlreadyExistsException();

        // // validate if the id already exists
        // const existIdentity: boolean = await this._existUserByIdentity.run(
        //     user.identity._value,
        //     user._id._value
        // );

        // if (existIdentity) throw new IdentityAlreadyExistsException();

        // // validate if the email exists
        // const existEmail: boolean = await this._existUserByEmail.run(
        //     user.email._value,
        //     user._id._value
        // );

        // if (existEmail) throw new EmailAlreadyExistsException();

        // // validate if the phone exists
        // const existPhone: boolean = await this._existUserByPhone.run(
        //     user.phone._value,
        //     user._id._value
        // );

        // if (existPhone) throw new PhoneAlreadyExistsException();

        // console.log(user);

        // if everything goes well we save the user
        await this._userRepository.save(user);

        const newUser = await this._userRepository.getById(user._id);

        if (newUser == null) throw new Error('error');

        return newUser.toPrimitives();
    };
}
