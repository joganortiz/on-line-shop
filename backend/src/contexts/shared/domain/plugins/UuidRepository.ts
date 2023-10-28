export interface UuidRepository {
    /**
     * @description function that generates a uuid
     * @date 10/27/2023 - 10:07:39 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {() => Promise<string>}
     */
    generate: () => Promise<string>;

    /**
     * @description function that is valid if it is a valid uuid
     * @date 10/27/2023 - 10:09:22 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(value: string) => Promise<boolean>}
     */
    isUuidV4: (uuid: string) => Promise<boolean>;
}
