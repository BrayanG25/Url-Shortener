import request from 'supertest';
import app from '../App/app.js';
import { dbConnection } from '../Database/connection.js';

describe('Test URL controller functions', () => {

    let server = ``;
    beforeAll(() => { server = app.listen(4001); })
    afterAll(done => { dbConnection.end(); server.close(); done(); });

    test('GET /url should retrieve URLs successfully', async () => {
        const response = await request(app).get('/api/v1/shorten');

        expect(response.status).toBe(200);
        expect(response._body.success).toBe(true);
        expect(response._body.message).toBe('URLs retrieved');
        expect(response._body.data).toBeDefined();
    });

    /*
    test('POST /url should create a URL successfully', async () => {
        const urlData = {
            url: 'https://example.com',
            baseUrl: 'https://short.url',
            expirationDate: '31/12/2024'
        };

        const response = await request(app).post('/api/v1/shorten').send(urlData);

        expect(response.status).toBe(201);
        expect(response._body.success).toBe(true);
        expect(response._body.message).toBe('URL created');
        expect(response._body.data).toBeDefined();
    });
    */

    test('PUT /url/:id should update a URL successfully', async () => {
        const urlId = 1;
        const response = await request(app).put(`/api/v1/shorten/${urlId}`).send();

        expect(response.status).toBe(200);
        expect(response._body.success).toBe(true);
        expect(response._body.message).toBe('Url updated');
    });

    test('DELETE /url/:id should delete a URL successfully', async () => {
        const urlId = 1;
        const response = await request(app).delete(`/api/v1/shorten/${urlId}`);

        expect(response.status).toBe(200);
        expect(response._body.success).toBe(true);
        expect(response._body.message).toBe('Url deleted');
    });
});