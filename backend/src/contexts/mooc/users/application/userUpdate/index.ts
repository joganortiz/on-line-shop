import * as imports from '../UserCreate/importsCreateUsers';

export class UserUpdateUseCase {
    private readonly _userRepository: imports.UserRepository;
    private readonly _roleGetterById: imports.RoleGetterById;
    private readonly _countryGetterById: imports.CountryGetterById;
    private readonly _stateGetterById: imports.StateGetterById;
    private readonly _cityGetterById: imports.CityGetterById;
    private readonly _existUserByUserName: imports.ExistUserByUserName;
    private readonly _existUserByIdentity: imports.ExistUserByIdentity;
    private readonly _existUserByEmail: imports.ExistUserByEmail;
    private readonly _existUserByPhone: imports.ExistUserByPhone;
    private readonly _fileSistem: imports.FileSystemRepository;
    private readonly _usereGetterById: imports.UserGetterById;
    constructor(
        userRepository: imports.UserRepository,
        roleRepository: imports.RoleRepository,
        countryRepository: imports.CountryRepository,
        stateRepository: imports.StateRepository,
        cityRepository: imports.CityRepository,
        fileSistem: imports.FileSystemRepository
    ) {
        this._userRepository = userRepository;
        this._roleGetterById = new imports.RoleGetterById(roleRepository);
        this._countryGetterById = new imports.CountryGetterById(
            countryRepository
        );
        this._stateGetterById = new imports.StateGetterById(stateRepository);
        this._cityGetterById = new imports.CityGetterById(cityRepository);
        this._existUserByUserName = new imports.ExistUserByUserName(
            userRepository
        );
        this._existUserByIdentity = new imports.ExistUserByIdentity(
            userRepository
        );
        this._existUserByEmail = new imports.ExistUserByEmail(userRepository);
        this._existUserByPhone = new imports.ExistUserByPhone(userRepository);
        this._fileSistem = fileSistem;
        this._usereGetterById = new imports.UserGetterById(userRepository);
    }

    run = async (
        id: string,
        dataUser: imports.UserCommand
    ): Promise<imports.PrimitiveUser> => {
        const user = await this._usereGetterById.run(id);

        let country;
        let state;
        let city;
        if (dataUser.country !== undefined && dataUser.country != null) {
            // get the country data
            country = await this._countryGetterById.run(dataUser.country);

            // get the state data
            state = await this._stateGetterById.run(dataUser.state);

            // get the city data
            city = await this._cityGetterById.run(dataUser.city);
        }

        // get the role data
        const role = await this._roleGetterById.run(
            dataUser.idRole ?? user.role._id._value
        );

        const userUpdate = imports.User.fromPrimitives({
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

        if (existUserName) throw new imports.UserNameAlreadyExistsException();

        // validate if the id already exists
        const existIdentity: boolean = await this._existUserByIdentity.run(
            user._id._value,
            userUpdate.identity?._value
        );

        if (existIdentity) throw new imports.IdentityAlreadyExistsException();

        // validate if the email exists
        const existEmail: boolean = await this._existUserByEmail.run(
            user.email._value,
            userUpdate._id._value
        );

        if (existEmail) throw new imports.UserEmailAlreadyExistsException();

        // validate if the phone exists
        const existPhone: boolean = await this._existUserByPhone.run(
            user._id._value,
            userUpdate.phone?._value
        );

        if (existPhone) throw new imports.UserPhoneAlreadyExistsException();

        // if everything goes well we save the user
        const userUpdateGetter = await this._userRepository.update(
            user._id,
            userUpdate
        );

        return userUpdateGetter.toPrimitives();
    };
}
