export const validateResults = (query, results) => {
    if (!results) {
        throw new Error(`No records found in the query ${query}`);
    }
};

export const handleQueryError = (query, error) => {
    console.error(`Error in the query ${query}: `, error);
    throw new Error(`Error in the query ${query}`);
};