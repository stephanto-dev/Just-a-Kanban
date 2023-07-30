import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateCard1690743944701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('cards', new TableColumn({
            name: 'color',
            type: 'varchar',
            length: '100',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('cards', 'color')
    }

}
