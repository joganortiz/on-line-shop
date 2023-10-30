import { RoleEntityMysql } from '../../../../roles/infrastructure/persistence/typeorm';
import { SubModuleEntityMysql } from '../../../../subModule/infrastructure/persistence/typeorm';
import { StatusType } from '../../../../../shared/domain/typeOrm';
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity({
    name: 'roles_permissions',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class PermissionRoleEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @ManyToOne(() => RoleEntityMysql, (role) => role.permission, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        nullable: false
    })
    @JoinColumn({
        name: 'role_id',
        foreignKeyConstraintName: 'FK_permission_role_id'
    })
    role: RoleEntityMysql;

    @ManyToOne(
        () => SubModuleEntityMysql,
        (subModule) => subModule.permission,
        {
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
            nullable: false
        }
    )
    @JoinColumn({
        name: 'module_sub_id',
        foreignKeyConstraintName: 'FK_permission_submodule_id'
    })
    subModule: SubModuleEntityMysql;

    @Column({
        type: 'enum',
        enum: StatusType,
        nullable: false,
        default: '0',
        comment: '0->Inactive 1->Active'
    })
    create: StatusType;

    @Column({
        type: 'enum',
        enum: StatusType,
        nullable: false,
        default: '0',
        comment: '0->Inactive 1->Active'
    })
    read: StatusType;

    @Column({
        type: 'enum',
        enum: StatusType,
        nullable: false,
        default: '0',
        comment: '0->Inactive 1->Active'
    })
    update: StatusType;

    @Column({
        type: 'enum',
        enum: StatusType,
        nullable: false,
        default: '0',
        comment: '0->Inactive 1->Active'
    })
    delete: StatusType;
}
