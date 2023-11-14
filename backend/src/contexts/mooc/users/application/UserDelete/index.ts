import { UserAdminNotDeleteException } from '../../domain/exceptions';
import { UserGetterById } from '../../domain/services';
import {
    type PrimitiveUser,
    type UserRepository
} from '../UserCreate/importsCreateUsers';

export class UserDeleteUseCase {
    private readonly _userRepository: UserRepository;
    private readonly _usereGetterById: UserGetterById;
    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
        this._usereGetterById = new UserGetterById(userRepository);
    }

    run = async (id: string): Promise<PrimitiveUser> => {
        // We validate that it is not the super administrator user
        if (id === '9cafa3b5-5d57-11ed-aa8a-00e04c360ad5')
            throw new UserAdminNotDeleteException();

        const userToDelete = await this._usereGetterById.run(id);

        // if the user exists we proceed to delete it
        await this._userRepository.delete(userToDelete._id);

        return { ...userToDelete.toPrimitives(), status: '0' };
    };
}
