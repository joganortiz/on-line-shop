import { MoocBackendApp } from '../../src/apps/BackendApp';
import request from 'supertest'

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(new MoocBackendApp().start())
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});