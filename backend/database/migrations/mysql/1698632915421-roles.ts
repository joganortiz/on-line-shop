import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1698632915421 implements MigrationInterface {
    name = 'Roles1698632915421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`roles\` (
                \`_id\` varchar(36) NOT NULL,
                \`name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`description\` varchar(500) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`removed\` enum ('0', '1') NOT NULL COMMENT '0->removed 1->Not removed' DEFAULT '1',
                \`created_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
        await queryRunner.query(`
            CREATE TABLE \`roles_permissions\` (
                \`_id\` varchar(36) NOT NULL,
                \`create\` enum ('0', '1') NOT NULL COMMENT '0->Inactive 1->Active' DEFAULT '0',
                \`read\` enum ('0', '1') NOT NULL COMMENT '0->Inactive 1->Active' DEFAULT '0',
                \`update\` enum ('0', '1') NOT NULL COMMENT '0->Inactive 1->Active' DEFAULT '0',
                \`delete\` enum ('0', '1') NOT NULL COMMENT '0->Inactive 1->Active' DEFAULT '0',
                \`role_id\` varchar(36) NOT NULL,
                \`module_sub_id\` varchar(36) NOT NULL,
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
        await queryRunner.query(`
            CREATE TABLE \`modules_sub\` (
                \`_id\` varchar(36) NOT NULL,
                \`title\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`order\` int NOT NULL,
                \`url\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`module_id\` varchar(36) NOT NULL,
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
        await queryRunner.query(`
            CREATE TABLE \`modules\` (
                \`_id\` varchar(36) NOT NULL,
                \`title\` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`order\` int NOT NULL,
                \`icon\` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`children\` enum ('0', '1') NOT NULL COMMENT '0->does not have sub modules 1->has sub modules' DEFAULT '1',
                \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE INDEX \`IDX_37e868d35344396b2891d6a095\` (\`order\`),
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_permissions\`
            ADD CONSTRAINT \`FK_permission_role_id\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_permissions\`
            ADD CONSTRAINT \`FK_permission_submodule_id\` FOREIGN KEY (\`module_sub_id\`) REFERENCES \`modules_sub\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`modules_sub\`
            ADD CONSTRAINT \`FK_submodule_module_id\` FOREIGN KEY (\`module_id\`) REFERENCES \`modules\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`modules_sub\` DROP FOREIGN KEY \`FK_submodule_module_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_permission_submodule_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_permission_role_id\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_37e868d35344396b2891d6a095\` ON \`modules\`
        `);
        await queryRunner.query(`
            DROP TABLE \`modules\`
        `);
        await queryRunner.query(`
            DROP TABLE \`modules_sub\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles_permissions\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles\`
        `);
    }

}
