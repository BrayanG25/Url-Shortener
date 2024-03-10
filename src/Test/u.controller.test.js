import request from 'supertest';
import app from '../App/app.js';
import { dbConnection } from '../Database/connection.js';

describe('redirectOriginalUrl', () => {

    let server = ``;
    beforeAll(() => { server = app.listen(4001); })
    afterAll(done => { dbConnection.end(); server.close(); done(); });

    /*
    test('Should redirect to the original URL if the shortened code exists and has not expired', async () => {
        const shortenedCode = 'hwQdBIgylP';
        const response = await request(app).get(`/api/v1/u/${shortenedCode}`);
        expect(response.status).toBe(301);
        expect(response.header['location']).toBe('https://www.youtube.com/watch?v=uUdKAYl-F7g');
    });
    */

    test('Should return a 404 error if the shortened code does not exist', async () => {
        const nonExistingCode = 'NONEXISTENT';
        const response = await request(app).get(`/api/v1/u/${nonExistingCode}`);
        expect(response.status).toBe(404);
        expect(response._body.error.message).toBe('URL not found');
    });

    /*
    test('Should return a 410 error if the shortened code has expired', async () => {
        const expiredCode = 'hwQdBIgylP';
        const response = await request(app).get(`/api/v1/u/${expiredCode}`);
        expect(response.status).toBe(410);
        expect(response._body.error.message).toBe('URL has expired');
    });
    */
});