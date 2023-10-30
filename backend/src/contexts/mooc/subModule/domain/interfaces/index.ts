import { type PrimitiveModule } from '@src/contexts/mooc/module/domain/interfaces';
import {
    type SubModuleCreate,
    type SubModuleId,
    type SubModuleOrder,
    type SubModuleTitle,
    type SubModuleUrl
} from '../value-objects';
import { type Module } from '@src/contexts/mooc/module/domain/Module';

export interface PrimitiveSubModule {
    _id: string;
    title: string;
    order: number;
    url: string;
    created?: Date;
    module?: PrimitiveModule;
}

export interface valueObjectSubModule {
    _id: SubModuleId;
    title: SubModuleTitle;
    order: SubModuleOrder;
    url: SubModuleUrl;
    created?: SubModuleCreate;
    module?: Module;
}
