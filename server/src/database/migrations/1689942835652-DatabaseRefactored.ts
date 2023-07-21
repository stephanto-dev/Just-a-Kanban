import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class DatabaseRefactored1689942835652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         //Tabela cards
        await queryRunner.createTable(
            new Table({
                name: 'cards',
                columns: [
                    {
                        name: 'idCard',
                        type: 'varchar',
                        length: '100',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'text',
                        type: 'varchar',
                        length: '100',
                    },
                    {
                        name: 'idStatus',
                        type: 'int',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["idStatus"],
                        referencedTableName: "status",
                        referencedColumnNames: ["idStatus"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]

            })
        )

        //Tabela status
        await queryRunner.createTable(
            new Table({
                name: 'status',
                columns: [
                    {
                        name: 'idStatus',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    }
                ]
            })
        )
        
        //Tabela users
        await queryRunner.createTable(new Table({
            name: 'users',
            columns:[
                {
                    name: 'idUser',
                    type: "varchar",
                    length: '100',
                    isPrimary: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '100',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '100',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '256',
                    isNullable: false
                }
            ]
        }))

        //Tabela usersCards
        await queryRunner.createTable(new Table({
            name: 'usersCards',
            columns: [
                {
                    name: 'idUser',
                    type: 'varchar',
                    length: '100',
                    isPrimary: true
                },
                {
                    name: 'idCard',
                    type: 'varchar',
                    length: '100',
                    isPrimary: true
                }
            ],
            foreignKeys:[
                {
                    columnNames: ['idUser'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['idUser']
                },
                {
                    columnNames: ['idCard'],
                    referencedTableName: 'cards',
                    referencedColumnNames: ['idCard']
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cards");
        await queryRunner.dropTable("status");
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("usersCards");
    }

}
