import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { StateEntityMysql } from '../../../../states/infrastructure/persistence/typeorm';
import { CityEntityMysql } from '../../.././../cities/infrastructure/persistence/typeorm';

@Entity({
    name: 'countries',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class CountryEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        type: 'varchar',
        length: 50,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 3,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        nullable: false
    })
    iso3: string;

    @Column({
        type: 'varchar',
        length: 2,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    iso2: string;

    @Column({
        name: 'phonecode',
        type: 'varchar',
        length: 20,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        nullable: false
    })
    phoneCode: string;

    @Column({
        type: 'varchar',
        length: 50,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        nullable: true,
        select: false
    })
    capital?: string;

    @Column({
        type: 'varchar',
        length: 15,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    currency: string;

    @Column({
        name: 'currency_name',
        type: 'varchar',
        length: 100,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    currencyName: string;

    @Column({
        name: 'currency_symbol',
        type: 'varchar',
        length: 10,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    currencySymbol: string;

    @Column({
        type: 'varchar',
        length: 10,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    tld: string;

    @Column({
        type: 'varchar',
        length: 200,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    flag: string;

    @OneToMany(() => StateEntityMysql, (state) => state.country)
    state: StateEntityMysql[];

    @OneToMany(() => CityEntityMysql, (city) => city.country)
    city: CityEntityMysql[];

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
