export interface BcryptRepository {
    cryptPassword: (password: string) => Promise<string>;
}
