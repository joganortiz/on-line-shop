import { ModuleEntityMysql } from '../../../../module/infrastructure/persistence/typeorm';
import { PermissionRoleEntityMysql } from '../../../../permission/infrastructure/persistence/typeorm';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({
    name: 'modules_sub',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class SubModuleEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @ManyToOne(() => ModuleEntityMysql, (module) => module.subModule, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        nullable: false
    })
    @JoinColumn({
        name: 'module_id',
        foreignKeyConstraintName: 'FK_submodule_module_id'
    })
    module: ModuleEntityMysql;

    @OneToMany(
        () => PermissionRoleEntityMysql,
        (permission) => permission.subModule
    )
    permission: PermissionRoleEntityMysql[];

    @Column({
        type: 'varchar',
        length: 55,
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    title: string;

    @Column({
        type: 'int',
        nullable: false
    })
    order: number;

    @Column({
        type: 'varchar',
        length: 55,
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    url: string;

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
