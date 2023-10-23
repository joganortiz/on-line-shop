import { TypeOrmClientFactory } from './TypeOrmClientFactory';

/**
 * @description connection to the database for migrations
 * @date 10/21/2023 - 10:44:47 PM
 * @author Jogan Ortiz Muñoz
 *
 * @type {*}
 */
const connect = new TypeOrmClientFactory();
export const dataSource = connect.dataSource();
