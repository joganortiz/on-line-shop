import { RemovedType } from '../../../../../shared/domain/typeOrm';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
        enum: RemovedType,
        nullable: false,
        default: '1',
        comment: '0->removed 1->Not removed'
    })
    removed: RemovedType;

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