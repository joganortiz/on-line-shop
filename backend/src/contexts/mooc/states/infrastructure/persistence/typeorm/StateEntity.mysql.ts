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

import { CityEntityMysql } from '../../.././../cities/infrastructure/persistence/typeorm';
import { CountryEntityMysql } from '../../.././../countries/infrastructure/persistence/typeorm';
import {
    RemovedType,
    StatusType
} from '../../.././../../shared/domain/typeOrm';

@Entity({
    name: 'states',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class StateEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        type: 'varchar',
        length: 255,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    name: string;

    @ManyToOne(() => CountryEntityMysql, (country) => country.state, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    })
    @JoinColumn({
        name: 'country_id',
        foreignKeyConstraintName: 'FK_satates_country_id'
    })
    country: CountryEntityMysql;

    @Column({
        name: 'fips_code',
        type: 'varchar',
        length: 255,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    fipsCode: string;

    @Column({
        type: 'varchar',
        length: 5,
        default: null,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    iso2: string;

    @OneToMany(() => CityEntityMysql, (city) => city.state)
    city: CityEntityMysql[];

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
