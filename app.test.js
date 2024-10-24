const request = require('supertest');
const { app, server } = require('./app');  // Import both app and server

describe('Math API Tests', () => {

    afterAll(() => {
        server.close();  // Close the server after the tests are done
    });

    test('POST /add - should return the correct sum', async () => {
        const response = await request(app)
            .post('/add')
            .send({ num1: 5, num2: 3 });

        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(8);  // 5 + 3 = 8
    });

    test('POST /subtract - should return the correct difference', async () => {
        const response = await request(app)
            .post('/subtract')
            .send({ num1: 5, num2: 3 });

        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(2);  // 5 - 3 = 2
    });
});
