import convict from 'convict';
import dotenv from 'dotenv';

dotenv.config();

const env = convict({
	env: {
		doc: 'The application environment',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV'
	},
	port: {
		doc: 'The port to bind',
		format: 'port',
		default: 8080,
		env: 'PORT'
	},
	cors: {
		doc: 'list array url accept cors',
		format: Array,
		env: 'CORS',
		default: ['http://localhost:5173/']
	},
	keyJwt: {
		doc: 'jwt token.',
		format: String,
		env: 'KEY_JWT',
		default: 'on-line-shop-987654321'
	},
	dataBase: {
		doc: 'type of database to use',
		format: String,
		env: 'DATABASE',
		default: 'mysql'
	},
	credentialMYSQL: {
		host: {
			doc: 'The database host',
			format: String,
			env: 'MYSQL_DB_HOST',
			default: 'localhost'
		},
		database: {
			doc: 'The database name',
			format: String,
			env: 'MYSQL_DB_NAME',
			default: 'db_on_line_shop'
		},
		username: {
			doc: 'The database username',
			format: String,
			env: 'MYSQL_DB_USER',
			default: 'root'
		},
		password: {
			doc: 'The database password',
			format: String,
			env: 'MYSQL_DB_PASSWORD',
			default: ''
		},
		port: {
			doc: 'The database port',
			format: 'port',
			env: 'MYSQL_DB_PORT',
			default: 3306
		},
		charset: {
			doc: 'The database charset',
			format: String,
			env: 'MYSQL_DB_CHARSET',
			default: 'utf8'
		}
	}
});

const envConfig: string = env.get('env').trim();

env.loadFile(`${__dirname}/${envConfig}.json`);

export default env;
