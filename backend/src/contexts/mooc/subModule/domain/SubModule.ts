import { ModelRoot } from '@src/contexts/shared/domain';
import {
    SubModuleCreate,
    SubModuleId,
    SubModuleOrder,
    SubModuleTitle,
    SubModuleUrl
} from './value-objects';
import { Module } from '../../module/domain/Module';
import {
    type PrimitiveSubModule,
    type valueObjectSubModule
} from './interfaces';

export class SubModule extends ModelRoot<PrimitiveSubModule> {
    readonly _id: SubModuleId;
    readonly title: SubModuleTitle;
    readonly order: SubModuleOrder;
    readonly url: SubModuleUrl;
    readonly created?: SubModuleCreate;
    readonly module?: Module;

    constructor(dataClass: valueObjectSubModule) {
        super();
        this._id = dataClass._id;
        this.title = dataClass.title;
        this.order = dataClass.order;
        this.url = dataClass.url;
        this.created = dataClass?.created;
        this.module = dataClass?.module;
    }

    static fromPrimitives({
        _id,
        title,
        order,
        url,
        created,
        module
    }: PrimitiveSubModule): SubModule {
        const subModule: valueObjectSubModule = {
            _id: new SubModuleId(_id),
            title: new SubModuleTitle(title),
            order: new SubModuleOrder(order),
            url: new SubModuleUrl(url),
            created: new SubModuleCreate(created)
        };

        if (module !== undefined) {
            subModule.module = Module.fromPrimitives(module);
        }
        return new SubModule(subModule);
    }

    toPrimitives(): PrimitiveSubModule {
        return {
            _id: this._id._value,
            title: this.title._value,
            order: this.order._value,
            url: this.url._value,
            created: this.created?._value,
            module: this.module?.toPrimitives()
        };
    }
}
