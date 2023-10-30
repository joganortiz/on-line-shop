import { ModelRoot } from '@src/contexts/shared/domain';
import {
    ModuleChildren,
    ModuleCreate,
    ModuleIcon,
    ModuleId,
    ModuleOrder,
    ModuleTitle
} from './value-objects';
import { type valueObjectModule, type PrimitiveModule } from './interfaces';

export class Module extends ModelRoot<PrimitiveModule> {
    readonly id: ModuleId;
    readonly title: ModuleTitle;
    readonly order: ModuleOrder;
    readonly icon: ModuleIcon;
    readonly children: ModuleChildren;
    readonly created?: ModuleCreate;

    constructor(dataClass: valueObjectModule) {
        super();
        this.id = dataClass.id;
        this.title = dataClass.title;
        this.order = dataClass.order;
        this.icon = dataClass.icon;
        this.children = dataClass.children;
        this.created = dataClass.created;
    }

    static fromPrimitives({
        _id,
        title,
        order,
        icon,
        children,
        created
    }: PrimitiveModule): Module {
        return new Module({
            id: new ModuleId(_id),
            title: new ModuleTitle(title),
            order: new ModuleOrder(order),
            icon: new ModuleIcon(icon),
            children: new ModuleChildren(children),
            created: new ModuleCreate(created)
        });
    }

    toPrimitives(): PrimitiveModule {
        return {
            _id: this.id._value,
            title: this.title._value,
            order: this.order._value,
            icon: this.icon._value,
            children: this.children._value,
            created: this.created?._value
        };
    }
}
