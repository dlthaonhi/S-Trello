import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1736338220394 implements MigrationInterface {
    name = ' $npmConfigName1736338220394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`description\` \`description\` varchar(255) COLLATE "utf8mb4_general_ci" NOT NULL`);
    }

}
