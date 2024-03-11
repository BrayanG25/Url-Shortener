/**
    * Entry point of the application, starts the server.
    * @module index
*/
import app from './src/App/app.js';

const PORT = app.get('port');

/**
    * Starts the server on the specified port.
    * @function startServer
    * @param {number} port - The port number on which the server should listen.
*/
app.listen(PORT, () => console.info(`Server on port: ${PORT}`));
