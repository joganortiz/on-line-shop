import { SubModuleEntityMysql } from '../../../../subModule/infrastructure/persistence/typeorm';
import { ChildrenType } from '../../../../../shared/domain/typeOrm';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({
    name: 'modules',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class ModuleEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    title: string;

    @Column({
        type: 'int',
        nullable: false,
        unique: true
    })
    order: number;

    @Column({
        type: 'longtext',
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    icon: string;

    @Column({
        type: 'enum',
        enum: ChildrenType,
        nullable: false,
        default: '1',
        comment: '0->does not have sub modules 1->has sub modules'
    })
    children: ChildrenType;

    @OneToMany(() => SubModuleEntityMysql, (subModule) => subModule.module)
    subModule: SubModuleEntityMysql[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        precision: 0,
        select: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    created?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        precision: 0,
        select: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updated?: Date;
}
