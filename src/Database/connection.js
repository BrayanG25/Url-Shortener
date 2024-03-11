import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

/**
    * Represents a database connection.
    * @class DatabaseConnection
*/
class DatabaseConnection {
    /**
        * Creates an instance of DatabaseConnection.
        * @constructor
        * @throws {Error} Throws an error if any required environment variables are missing or if there's an error establishing the database connection.
    */
    constructor() {
        const requiredEnvVariables = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE', 'DB_PORT'];
        const missingVariables = requiredEnvVariables.filter(variable => !process.env[variable]);

        if (missingVariables.length > 0) {
            console.error('Missing environment variables:', missingVariables.join(', '));
            throw new Error('Missing environment variables. Please ensure all required environment variables are set.');
        }

        this.connectionConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            connectionLimit: 100,
            connectTimeout: 20000,
        };

        this.connection = null;
        this.connect();
    }

    /**
        * Establishes the database connection.
        * @method connect
        * @throws {Error} Throws an error if there's an error establishing the database connection.
    */
    async connect() {
        try {
            this.connection = await mysql.createPool(this.connectionConfig);
            console.log('Database connection established');

            this.connection.on('error', async (err) => {
                console.error('Database connection error:', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.log('Attempting to reconnect to the database...');
                    this.connection = await mysql.createPool(this.connectionConfig);
                    console.log('Reconnected to the database');
                }
            });

        } catch (error) {
            console.error('Error establishing database connection:', error);
            throw new Error('An error occurred while establishing the database connection. Please try again later.');
        }
    }

    /**
        * Executes a SQL query.
        * @method query
        * @param {string} sql The SQL query string.
        * @param {Array} [values] Optional values to be escaped and inserted into placeholders.
        * @returns {Promise<{ results: Array, fields: Array }>} A promise that resolves to an object containing the query results and fields.
        * @throws {Error} Throws an error if there's an error executing the query.
    */
    async query(sql, values) {
        try {
            const [results, fields] = await this.connection.query(sql, values);
            return { results, fields };

        } catch (error) {
            console.error('Error executing query:', error);
            const errorMessages = {
                'PROTOCOL_SEQUENCE_TIMEOUT': 'The database connection timed out. Please try again later.',
                'ER_ACCESS_DENIED_ERROR': 'Access to the database was denied. Please check your credentials and try again.',
                'ER_BAD_DB_ERROR': 'The specified database does not exist. Please check your database name and try again.'
            };
            const errorMessage = errorMessages[error.code] || 'An error occurred while executing the query. Please try again later.';
            throw new Error(errorMessage);
        }
    }

    /**
        * Closes the database connection.
        * @method end
        * @throws {Error} Throws an error if there's an error closing the connection.
    */
    async end() {
        try {
            await this.connection.end();
            console.log('Connection closed');

        } catch (error) {
            console.error('Error closing connection:', error);
            const errorMessages = {
                'PROTOCOL_CONNECTION_LOST': 'The database connection was lost. Please check your network connection or try again later.',
                'ER_CON_COUNT_ERROR': 'The database connection limit was exceeded. Please try again later.',
                'ER_SERVER_GONE_ERROR': 'The database server has gone away. Please try again later.'
            };
            const errorMessage = errorMessages[error.code] || 'An error occurred while closing the connection. Please try again later.';
            throw new Error(errorMessage);
        }
    }
}

export const dbConnection = new DatabaseConnection();
