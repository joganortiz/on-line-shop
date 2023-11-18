import { DataSource } from 'typeorm';
import path from 'path';

import env from '../../config/env';

export class TypeOrmClientFactory {
    private readonly _appDataSource: DataSource;
    constructor() {
        const DATABASE: string = env.get('dataBase').toLowerCase();
        const PRODUCTION: string = env.get('env').toLowerCase();
        this._appDataSource = new DataSource({
            type: 'mysql',
            host: env.get('credentialMYSQL.host'),
            port: env.get('credentialMYSQL.port'),
            username: env.get('credentialMYSQL.username'),
            password: env.get('credentialMYSQL.password'),
            database: env.get('credentialMYSQL.database'),
            charset: env.get('credentialMYSQL.charset'),
            synchronize: false,
            logging: false,
            entities: [
                path.join(
                    __dirname,
                    `/../../../../mooc/**/**/infrastructure/persistence/typeorm/*.${DATABASE}.${
                        PRODUCTION !== 'production' ? 'ts' : 'js'
                    }`
                )
            ],
            subscribers: [],
            migrations:
                PRODUCTION !== 'production'
                    ? [
                          path.join(
                              __dirname,
                              `/../../../../../../database/migrations/${DATABASE}/*.ts`
                          )
                      ]
                    : undefined,
            migrationsTableName: 'migrations',
            connectorPackage: 'mysql2'
        });
    }

    /**
     * @description function DataSource
     * @date 10/21/2023 - 10:43:43 PM
     * @author Jogan Ortiz Muñoz
     *
     * @public
     * @type {() => DataSource}
     */
    public dataSource = (): DataSource => {
        return this._appDataSource;
    };

    /**
     * @description initialize the connection and if everything went well in the connection
     * @date 10/21/2023 - 10:43:29 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {() => Promise<void>}
     */
    initialize = async (): Promise<void> => {
        await this._appDataSource
            .initialize()
            .then(() => {
                console.info('database running');
            })
            .catch((error) => {
                console.error('The database did not run ', error);
            });
    };
}
