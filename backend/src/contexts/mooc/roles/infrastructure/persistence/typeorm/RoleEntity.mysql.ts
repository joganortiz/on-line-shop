import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { PermissionRoleEntityMysql } from '../../../../permission/infrastructure/persistence/typeorm/PermissionEntity.mysql';
import { RemovedType, StatusType } from '../../../../../shared/domain/typeOrm';
import { UserEntityMysql } from '../../../../users/infrastructure/persistence/typeorm';
import { ClientEntityMysql } from '../../../../clients/infrastructure/persistence/typeorm';

@Entity({
    name: 'roles',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class RoleEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    description: string;

    @Column({
        type: 'enum',
        enum: StatusType,
        nullable: false,
        default: StatusType.ACTIVE,
        comment: '0->removed 1->Not removed'
    })
    visible: StatusType;

    @Column({
        type: 'enum',
        enum: RemovedType,
        nullable: false,
        default: RemovedType.NOT_REMOVED,
        comment: '0->removed 1->Not removed'
    })
    removed: RemovedType;

    @OneToMany(() => PermissionRoleEntityMysql, (permission) => permission.role)
    permission: PermissionRoleEntityMysql[];

    @OneToMany(() => UserEntityMysql, (user) => user.role)
    user: PermissionRoleEntityMysql[];

    @OneToMany(() => ClientEntityMysql, (client) => client.role)
    client: ClientEntityMysql[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        precision: 0,
        nullable: true,
        select: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    created?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        precision: 0,
        select: false,
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updated?: Date;
}
