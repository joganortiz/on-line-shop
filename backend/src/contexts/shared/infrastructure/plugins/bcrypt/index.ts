import bcryptjs from 'bcryptjs';

export const bcrypt = {
    hash: async (string: string) => {
        const salt = bcryptjs.genSaltSync();
        const stringHash = bcryptjs.hashSync(string, salt);

        return stringHash;
    }
};
