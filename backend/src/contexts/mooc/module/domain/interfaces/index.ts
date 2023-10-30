import {
    type ModuleChildren,
    type ModuleCreate,
    type ModuleIcon,
    type ModuleId,
    type ModuleOrder,
    type ModuleTitle
} from '../value-objects';

export interface PrimitiveModule {
    _id: string;
    title: string;
    order: number;
    icon: string;
    children: string;
    created?: Date;
}

export interface valueObjectModule {
    id: ModuleId;
    title: ModuleTitle;
    order: ModuleOrder;
    icon: ModuleIcon;
    children: ModuleChildren;
    created?: ModuleCreate;
}
