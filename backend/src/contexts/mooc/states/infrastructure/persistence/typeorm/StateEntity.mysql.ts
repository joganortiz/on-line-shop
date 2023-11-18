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
import { UserEntityMysql } from '../../.././../users/infrastructure/persistence/typeorm';
import { ClientEntityMysql } from '../../.././../clients/infrastructure/persistence/typeorm';

@Entity({
    name: 'states',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class StateEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        type: 'varchar',
        length: 100,
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
        type: 'varchar',
        length: 5,
        default: null,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci'
    })
    iso2: string;

    @OneToMany(() => CityEntityMysql, (city) => city.state)
    city: CityEntityMysql[];

    @OneToMany(() => UserEntityMysql, (user) => user.state)
    user: UserEntityMysql[];

    @OneToMany(() => ClientEntityMysql, (client) => client.state)
    client: ClientEntityMysql[];

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
