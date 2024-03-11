/**
    * Validates the results of a database query.
    * @function validateResults
    * @param {string} query - The SQL query that was executed.
    * @param {any} results - The results of the database query.
    * @throws {Error} Throws an error if no records are found in the query results.
*/
export const validateResults = (query, results) => {
    if (!results) {
        throw new Error(`No records found in the query ${query}`);
    }
};

/**
    * Handles errors that occur during database queries.
    * @function handleQueryError
    * @param {string} query - The SQL query that caused the error.
    * @param {Error} error - The error object thrown during the database operation.
    * @throws {Error} Throws an error indicating the query that caused the error.
*/
export const handleQueryError = (query, error) => {
    console.error(`Error in the query ${query}: `, error);
    throw new Error(`Error in the query ${query}`);
};
