import { type UserRepository } from '../../domain/UserRepository';
import { RoleGetterById } from '@src/contexts/mooc/roles/domain/services/RoleGetterById';
import { CountryGetterById } from '@src/contexts/mooc/countries/domain/services';
import { StateGetterByIdAndIdCountry } from '@src/contexts/mooc/states/domain/services';
import { CityGetterById } from '@src/contexts/mooc/cities/domain/services';
import { type RoleRepository } from '@src/contexts/mooc/roles/domain';
import { type CountryRepository } from '@src/contexts/mooc/countries/domain/CountryRepository';
import { type StateRepository } from '@src/contexts/mooc/states/domain/StateRepository';
import { type CityRepository } from '@src/contexts/mooc/cities/domain/CityRepository';
import { User } from '../../domain/User';
import {
    ExistUserByIdentity,
    ExistUserByUserName,
    ExistUserByEmail,
    ExistUserByPhone,
    UserGetterById
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

export class UserUpdateUseCase {
    private readonly _userRepository: UserRepository;
    private readonly _roleGetterById: RoleGetterById;
    private readonly _countryGetterById: CountryGetterById;
    private readonly _stateGetterByIdAndCountry: StateGetterByIdAndIdCountry;
    private readonly _cityGetterById: CityGetterById;
    private readonly _existUserByUserName: ExistUserByUserName;
    private readonly _existUserByIdentity: ExistUserByIdentity;
    private readonly _existUserByEmail: ExistUserByEmail;
    private readonly _existUserByPhone: ExistUserByPhone;
    private readonly _fileSistem: FileSystemRepository;
    private readonly _usereGetterById: UserGetterById;
    constructor(
        userRepository: UserRepository,
        roleRepository: RoleRepository,
        countryRepository: CountryRepository,
        stateRepository: StateRepository,
        cityRepository: CityRepository,
        fileSistem: FileSystemRepository
    ) {
        this._userRepository = userRepository;
        this._roleGetterById = new RoleGetterById(roleRepository);
        this._countryGetterById = new CountryGetterById(countryRepository);
        this._stateGetterByIdAndCountry = new StateGetterByIdAndIdCountry(
            stateRepository
        );
        this._cityGetterById = new CityGetterById(cityRepository);
        this._existUserByUserName = new ExistUserByUserName(userRepository);
        this._existUserByIdentity = new ExistUserByIdentity(userRepository);
        this._existUserByEmail = new ExistUserByEmail(userRepository);
        this._existUserByPhone = new ExistUserByPhone(userRepository);
        this._fileSistem = fileSistem;
        this._usereGetterById = new UserGetterById(userRepository);
    }

    run = async (id: string, dataUser: UserCommand): Promise<PrimitiveUser> => {
        const user = await this._usereGetterById.run(id);

        let country;
        let state;
        let city;
        // if (dataUser.country !== undefined && dataUser.country != null) {
        //     // get the country data
        //     country = await this._countryGetterById.run(dataUser.country);

        //     // get the state data
        //     state = await this._stateGetterByIdAndCountry.run(dataUser.state);

        //     // get the city data
        //     city = await this._cityGetterById.run(dataUser.city);
        // }

        if (dataUser.country !== undefined && dataUser.country != null) {
            country = await this._countryGetterById.run(dataUser.country);
        }

        if (dataUser.state !== undefined && dataUser.state != null) {
            state = await this._stateGetterByIdAndCountry.run(
                dataUser.state,
                dataUser.country ?? user.country?._id._value
            );
        }

        // get the role data
        const role = await this._roleGetterById.run(
            dataUser.idRole ?? user.role._id._value
        );

        const userUpdate = User.fromPrimitives({
            _id: user._id._value,
            userName: dataUser.userName ?? user.userName._value,
            name: dataUser.name ?? user.name._value,
            lastName: dataUser.lastName ?? user.lastName._value,
            email: dataUser.email ?? user.email._value,
            identity: dataUser.identity ?? user.identity?._value,
            password: undefined as any,
            address: dataUser.address ?? user.address?._value,
            phone: dataUser.phone ?? user.phone?._value,
            codePhone: dataUser.codePhone ?? user.codePhone?._value,
            status: dataUser.status ?? user.status._value,
            country: country?.toPrimitives() ?? user.country?.toPrimitives(),
            state: state?.toPrimitives() ?? user.state?.toPrimitives(),
            city: city?.toPrimitives() ?? user.city?.toPrimitives(),
            role: role.toPrimitives()
        });

        // validate if the user already exists
        const existUserName: boolean = await this._existUserByUserName.run(
            user._id._value,
            userUpdate.userName._value
        );

        if (existUserName) throw new UserNameAlreadyExistsException();

        // validate if the id already exists
        const existIdentity: boolean = await this._existUserByIdentity.run(
            user._id._value,
            userUpdate.identity?._value
        );

        if (existIdentity) throw new IdentityAlreadyExistsException();

        // validate if the email exists
        const existEmail: boolean = await this._existUserByEmail.run(
            user.email._value,
            userUpdate._id._value
        );

        if (existEmail) throw new UserEmailAlreadyExistsException();

        // validate if the phone exists
        const existPhone: boolean = await this._existUserByPhone.run(
            user._id._value,
            userUpdate.phone?._value
        );

        if (existPhone) throw new UserPhoneAlreadyExistsException();

        // if everything goes well we save the user
        await this._userRepository.update(user._id, userUpdate);

        if (user.profilePicture?._value !== undefined) {
            this._fileSistem.removeImg(user.profilePicture?._value);
        }

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

        // we get the user data again
        const getterUserUpdate = await this._usereGetterById.run(
            user._id._value
        );

        return getterUserUpdate.toPrimitives();
    };
}
