import {
    LockedType,
    RemovedType,
    StatusType
} from '../../../../../shared/domain/typeOrm/index';

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { CountryEntityMysql } from '../../../../countries/infrastructure/persistence/typeorm';
import { StateEntityMysql } from '../../../../states/infrastructure/persistence/typeorm';
import { CityEntityMysql } from '../../../../cities/infrastructure/persistence/typeorm';
import { RoleEntityMysql } from '../../../../roles/infrastructure/persistence/typeorm';

@Entity({
    name: 'users',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class UserEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        type: 'varchar',
        name: 'user_name',
        length: 45,
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    userName: string;

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
        name: 'last_name',
        length: 50,
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        default: () => 'NULL'
    })
    identity?: string;

    @Column({
        type: 'varchar',
        length: 55,
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        unique: true,
        select: false
    })
    password: string;

    @ManyToOne(() => CountryEntityMysql, (country) => country.user, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        nullable: true
    })
    @JoinColumn({
        name: 'country_id',
        foreignKeyConstraintName: 'FK_user_country_id'
    })
    country: CountryEntityMysql;

    @ManyToOne(() => StateEntityMysql, (state) => state.user, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        nullable: true
    })
    @JoinColumn({
        name: 'state_id',
        foreignKeyConstraintName: 'FK_user_state_id'
    })
    state: StateEntityMysql;

    @ManyToOne(() => CityEntityMysql, (city) => city.user, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        nullable: true
    })
    @JoinColumn({
        name: 'city_id',
        foreignKeyConstraintName: 'FK_user_city_id'
    })
    city: CityEntityMysql;

    @Column({
        type: 'varchar',
        length: 55,
        nullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        default: () => 'NULL'
    })
    address?: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        select: false,
        default: () => 'NULL'
    })
    token?: string;

    @Column({
        type: 'tinyint',
        name: 'failed_attempts',
        nullable: false,
        select: false,
        default: 0
    })
    failedAttempts: number;

    @Column({
        type: 'enum',
        enum: LockedType,
        nullable: false,
        default: LockedType.NOT_LOCKED,
        comment: '0->locked 1->Not locked',
        select: false
    })
    locked: LockedType;

    @Column({
        type: 'timestamp',
        name: 'date_locked',
        precision: 0,
        nullable: true,
        select: false,
        default: () => 'NULL'
    })
    dateLocked?: Date;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
        default: () => 'NULL',
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    phone?: string;

    @Column({
        type: 'varchar',
        name: 'code_phone',
        length: 20,
        nullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        default: () => 'NULL'
    })
    codePhone?: string;

    @ManyToOne(() => RoleEntityMysql, (role) => role.user, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        nullable: false
    })
    @JoinColumn({
        name: 'role_id',
        foreignKeyConstraintName: 'FK_user_role_id'
    })
    role: RoleEntityMysql;

    @Column({
        type: 'enum',
        enum: StatusType,
        nullable: false,
        default: StatusType.INACTIVE,
        comment: '0->Inactive 1->Active'
    })
    status: StatusType;

    @Column({
        type: 'enum',
        enum: RemovedType,
        nullable: false,
        default: RemovedType.NOT_REMOVED,
        select: false,
        comment: '0->Removed 1->not removed'
    })
    removed: RemovedType;

    @Column({
        type: 'varchar',
        name: 'profile_picture',
        length: 255,
        nullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        default: () => 'NULL'
    })
    profilePicture?: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        precision: 0,
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    created: Date;

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
