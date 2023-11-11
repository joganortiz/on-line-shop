import * as imports from './imports';

export class UserCreateUseCase {
    private readonly _userRepository: imports.UserRepository;
    private readonly _uuidGenerator: imports.UuidRepository;
    private readonly _roleGetterById: imports.RoleGetterById;
    private readonly _countryGetterById: imports.CountryGetterById;
    private readonly _stateGetterById: imports.StateGetterById;
    private readonly _cityGetterById: imports.CityGetterById;
    private readonly _bcrypt: imports.BcryptRepository;
    private readonly _existUserByUserName: imports.ExistUserByUserName;
    private readonly _existUserByIdentity: imports.ExistUserByIdentity;
    private readonly _existUserByEmail: imports.ExistUserByEmail;
    private readonly _existUserByPhone: imports.ExistUserByPhone;
    private readonly _fileSistem: imports.FileSystemRepository;
    constructor(
        userRepository: imports.UserRepository,
        roleRepository: imports.RoleRepository,
        countryRepository: imports.CountryRepository,
        stateRepository: imports.StateRepository,
        cityRepository: imports.CityRepository,
        uuidGenerator: imports.UuidRepository,
        bcrypt: imports.BcryptRepository,
        fileSistem: imports.FileSystemRepository
    ) {
        this._userRepository = userRepository;
        this._uuidGenerator = uuidGenerator;
        this._bcrypt = bcrypt;
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
    }

    run = async (
        dataUser: imports.UserCommand
    ): Promise<imports.PrimitiveUser> => {
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
        const user = imports.User.create({
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

        if (existUserName) throw new imports.UserNameAlreadyExistsException();

        // validate if the id already exists
        const existIdentity: boolean = await this._existUserByIdentity.run(
            user._id._value,
            user.identity?._value
        );

        if (existIdentity) throw new imports.IdentityAlreadyExistsException();

        // validate if the email exists
        const existEmail: boolean = await this._existUserByEmail.run(
            user.email._value,
            user._id._value
        );

        if (existEmail) throw new imports.UserEmailAlreadyExistsException();

        // validate if the phone exists
        const existPhone: boolean = await this._existUserByPhone.run(
            user._id._value,
            user.phone?._value
        );

        if (existPhone) throw new imports.UserPhoneAlreadyExistsException();

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
                new imports.UserProfilePicture(image)
            );
        }

        const newUser = await this._userRepository.getById(user._id);

        if (newUser == null) throw new Error('error');

        return newUser.toPrimitives();
    };
}
