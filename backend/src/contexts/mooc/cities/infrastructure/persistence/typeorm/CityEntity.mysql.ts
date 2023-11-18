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

import { CountryEntityMysql } from '../../.././../countries/infrastructure/persistence/typeorm';
import { StateEntityMysql } from '../../.././../states/infrastructure/persistence/typeorm';
import { UserEntityMysql } from '../../.././../users/infrastructure/persistence/typeorm';
import { ClientEntityMysql } from '../../.././../clients/infrastructure/persistence/typeorm';

@Entity({
    name: 'cities',
    engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
})
export class CityEntityMysql extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        type: 'varchar',
        length: 100,
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

    @OneToMany(() => UserEntityMysql, (user) => user.city)
    user: UserEntityMysql[];

    @OneToMany(() => ClientEntityMysql, (client) => client.city)
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
