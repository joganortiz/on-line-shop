import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { type SubModule } from './SubModule';
import { type SubModuleId } from './value-objects';

export interface SubModuleRepository {
    /**
     * @description gets all modules and submodules in the system
     * @date 10/29/2023 - 7:40:19 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {() => Promise<SubModule[]>}
     */
    getAllSubModule: () => Promise<SubModule[]>;

    /**
     * @description look up the submodule by id
     * @date 10/29/2023 - 7:40:26 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: SubModuleId) => Promise<Nullable<SubModule>>}
     */
    getSubModuleById: (id: SubModuleId) => Promise<Nullable<SubModule>>;
}
