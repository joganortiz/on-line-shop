import { type UuidRepository } from '@contexts/shared/domain/plugins/UuidRepository';
import { uuid } from '../plugins/uuid';

export class UuidV4 implements UuidRepository {
    /**
     * @description function that generates a uuid
     * @date 10/27/2023 - 10:07:39 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {() => Promise<string>}
     */
    generate = async (): Promise<string> => {
        return await uuid.generate();
    };

    /**
     * @description function that is valid if it is a valid uuid
     * @date 10/27/2023 - 10:09:22 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(value: string) => Promise<boolean>}
     */
    isUuidV4 = async (value: string): Promise<boolean> => {
        return uuid.validate(value);
    };
}
