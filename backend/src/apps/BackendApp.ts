import 'reflect-metadata';

import { Server } from './server';
import { TypeOrmClientFactory } from '@contexts/shared/infrastructure/plugins/typeorm';
import env from '@contexts/shared/infrastructure/config/env';

export class MoocBackendApp {
    server?: Server;

    /**
     * @description call the initialize method of our project
     * @date 10/21/2023 - 10:10:58 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {() => Promise<void>}
     */
    start = async (): Promise<void> => {
        const PORT = env.get('port');
        this.server = new Server(PORT);

        // connection db
        const connection = new TypeOrmClientFactory();
        await connection.initialize();

        await this.server.listen();
    };

    /**
     * @description call the shutdown method of our project
     * @date 10/21/2023 - 10:11:07 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {() => Promise<void>}
     */
    stop = async (): Promise<void> => {
        await this.server?.stop();
    };
}
