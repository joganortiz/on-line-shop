import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699309340790 implements MigrationInterface {
    name = 'Init1699309340790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`modules\` (
                \`_id\` varchar(36) NOT NULL,
                \`title\` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`order\` int NOT NULL,
                \`icon\` longtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`children\` enum ('0', '1') NOT NULL COMMENT '0->does not have sub modules 1->has sub modules' DEFAULT '1',
                \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE INDEX \`IDX_37e868d35344396b2891d6a095\` (\`order\`),
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
            CREATE TABLE \`users\` (
                \`_id\` varchar(36) NOT NULL,
                \`user_name\` varchar(45) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`last_name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`identity\` varchar(30) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`email\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`password\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`address\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`token\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`failed_attempts\` tinyint NOT NULL DEFAULT '0',
                \`locked\` enum ('0', '1') NOT NULL COMMENT '0->locked 1->Not locked' DEFAULT '1',
                \`date_locked\` timestamp(0) NULL DEFAULT NULL,
                \`phone\` varchar(30) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`code_phone\` varchar(20) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`status\` enum ('0', '1') NOT NULL COMMENT '0->Inactive 1->Active' DEFAULT '0',
                \`removed\` enum ('0', '1') NOT NULL COMMENT '0->Removed 1->not removed' DEFAULT '1',
                \`profile_picture\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`created_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`country_id\` varchar(36) NULL,
                \`state_id\` varchar(36) NULL,
                \`city_id\` varchar(36) NULL,
                \`role_id\` varchar(36) NOT NULL,
                UNIQUE INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` (\`password\`),
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
        await queryRunner.query(`
            CREATE TABLE \`states\` (
                \`_id\` varchar(36) NOT NULL,
                \`name\` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`iso2\` varchar(5) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL,
                \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`country_id\` varchar(36) NULL,
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
        await queryRunner.query(`
            CREATE TABLE \`countries\` (
                \`_id\` varchar(36) NOT NULL,
                \`name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`iso3\` varchar(3) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`iso2\` varchar(2) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`phonecode\` varchar(20) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`capital\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL,
                \`currency\` varchar(15) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`currency_name\` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`currency_symbol\` varchar(10) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`tld\` varchar(10) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`flag\` varchar(200) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
        await queryRunner.query(`
            CREATE TABLE \`cities\` (
                \`_id\` varchar(36) NOT NULL,
                \`name\` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`state_id\` varchar(36) NOT NULL,
                \`country_id\` varchar(36) NOT NULL,
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
        await queryRunner.query(`
            CREATE TABLE \`clients\` (
                \`_id\` varchar(36) NOT NULL,
                \`user_name\` varchar(45) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`last_name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`identity\` varchar(30) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`email\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`password\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`address\` varchar(55) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`token\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`failed_attempts\` tinyint NOT NULL DEFAULT 1,
                \`locked\` enum ('0', '1') NOT NULL COMMENT '0->locked 1->Not locked' DEFAULT '1',
                \`date_locked\` timestamp(0) NULL DEFAULT NULL,
                \`phone\` varchar(30) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`code_phone\` varchar(5) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`status\` enum ('0', '1') NOT NULL COMMENT '0->Inactive 1->Active' DEFAULT '0',
                \`removed\` enum ('0', '1') NOT NULL COMMENT '0->Removed 1->not removed' DEFAULT '1',
                \`path_photo\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT NULL,
                \`created_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE INDEX \`IDX_d1118d13c9c73a8b90a2dcf39e\` (\`password\`),
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
        await queryRunner.query(`
            ALTER TABLE \`modules_sub\`
            ADD CONSTRAINT \`FK_submodule_module_id\` FOREIGN KEY (\`module_id\`) REFERENCES \`modules\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
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
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_user_country_id\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_user_state_id\` FOREIGN KEY (\`state_id\`) REFERENCES \`states\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_user_city_id\` FOREIGN KEY (\`city_id\`) REFERENCES \`cities\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_user_role_id\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`states\`
            ADD CONSTRAINT \`FK_satates_country_id\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`cities\`
            ADD CONSTRAINT \`FK_cities_state_id\` FOREIGN KEY (\`state_id\`) REFERENCES \`states\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`cities\`
            ADD CONSTRAINT \`FK_cities_country_id\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`_id\`) ON DELETE RESTRICT ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_cities_country_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_cities_state_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`states\` DROP FOREIGN KEY \`FK_satates_country_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_user_role_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_user_city_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_user_state_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_user_country_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_permission_submodule_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_permission_role_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`modules_sub\` DROP FOREIGN KEY \`FK_submodule_module_id\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_d1118d13c9c73a8b90a2dcf39e\` ON \`clients\`
        `);
        await queryRunner.query(`
            DROP TABLE \`clients\`
        `);
        await queryRunner.query(`
            DROP TABLE \`cities\`
        `);
        await queryRunner.query(`
            DROP TABLE \`countries\`
        `);
        await queryRunner.query(`
            DROP TABLE \`states\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles_permissions\`
        `);
        await queryRunner.query(`
            DROP TABLE \`modules_sub\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_37e868d35344396b2891d6a095\` ON \`modules\`
        `);
        await queryRunner.query(`
            DROP TABLE \`modules\`
        `);
    }

}
