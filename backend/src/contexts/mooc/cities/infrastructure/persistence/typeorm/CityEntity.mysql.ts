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

import { CountryEntityMysql } from '../../.././../countries/infrastructure/persistence/typeorm';
import { StateEntityMysql } from '../../.././../states/infrastructure/persistence/typeorm';
import {
    RemovedType,
    StatusType
} from '../../.././../../shared/domain/typeOrm';

@Entity({
    name: 'cities',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class CityEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        type: 'varchar',
        length: 255,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    name: string;

    @ManyToOne(() => StateEntityMysql, (state) => state.city, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        nullable: false
    })
    @JoinColumn({
        name: 'state_id',
        foreignKeyConstraintName: 'FK_cities_state_id'
    })
    state: StateEntityMysql;

    @ManyToOne(() => CountryEntityMysql, (country) => country.city, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        nullable: false
    })
    @JoinColumn({
        name: 'country_id',
        foreignKeyConstraintName: 'FK_cities_country_id'
    })
    country: CountryEntityMysql;

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

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        precision: 0,
        select: false,
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
