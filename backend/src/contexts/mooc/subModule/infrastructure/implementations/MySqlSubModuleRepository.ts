import { type Nullable } from '@src/contexts/shared/domain/Nullable';
import { SubModule } from '../../domain/SubModule';
import { type SubModuleRepository } from '../../domain/SubModuleRepository';
import { type SubModuleId } from '../../domain/value-objects';
import { SubModuleEntityMysql } from '../persistence/typeorm';

export class MySqlSubModuleRepository implements SubModuleRepository {
    /**
     * @description gets all modules and submodules in the system
     * @date 10/29/2023 - 7:39:55 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {() => Promise<{}>}
     */
    getAllSubModule = async (): Promise<SubModule[]> => {
        const items = await SubModuleEntityMysql.find({
            select: {
                _id: true,
                title: true,
                order: true,
                url: true,
                module: {
                    _id: true,
                    title: true,
                    icon: true,
                    children: true
                }
            },
            relations: {
                module: true
            },
            order: {
                module: {
                    order: 'ASC'
                }
            }
        });

        const subModule = items.map((item) => {
            return SubModule.fromPrimitives(item);
        });
        return subModule;
    };

    /**
     * @description look up the submodule by id
     * @date 10/29/2023 - 7:39:37 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(id: SubModuleId) => Promise<Nullable<SubModule>>}
     */
    getSubModuleById = async (
        id: SubModuleId
    ): Promise<Nullable<SubModule>> => {
        const items = await SubModuleEntityMysql.findOne({
            select: {
                _id: true,
                title: true,
                order: true,
                url: true,
                module: {
                    _id: true,
                    title: true,
                    icon: true,
                    children: true
                }
            },
            relations: {
                module: true
            },
            where: {
                _id: id._value
            }
        });

        if (items === null) return null;

        return SubModule.fromPrimitives(items);
    };
}
