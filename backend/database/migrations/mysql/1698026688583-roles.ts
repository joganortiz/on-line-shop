import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1698026688583 implements MigrationInterface {
    name = 'Roles1698026688583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`roles\` (
                \`_id\` varchar(36) NOT NULL,
                \`name\` varchar(50) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`description\` text CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL,
                \`removed\` enum ('0', '1') NOT NULL COMMENT '0->removed 1->Not removed' DEFAULT '1',
                \`created_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`_id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`roles\`
        `);
    }

}
