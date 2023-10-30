import supertest from 'supertest';
import { MoocBackendApp } from '../../src/apps/BackendApp';

const moocBackendApp = new MoocBackendApp();

const api = supertest(moocBackendApp.start());

// describe('Test the root path', () => {
//     test('It should response the GET method', (done) => {
//         request(new MoocBackendApp().start())
//             .get('/')
//             .then((response) => {
//                 expect(response.statusCode).toBe(200);
//                 done();
//             });
//     });
// });

test('It should response the GET method', async () => {
    await api.get('/').expect(404);
});

// afterAll(() => {
//     moocBackendApp.stop();
// });
