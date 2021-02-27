import request from 'supertest';
import { app } from '../app';
import { getConnection } from 'typeorm';

import createConnection from '../database';

describe("Surveys", () => {
    beforeAll(async () => {

        const connection = await createConnection();
        await connection.runMigrations();
    });
    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close()
    });
    it("E possivel realizar uma survey", async () => {
        const response = await request(app).post("/surveys").send(
            {
                title: 'Title.example',
                description: "Description.example"
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id"); // Verifica se o body possui o Id,que define o item da pesquisa 
    });
    it("Todas as surveys permitem pesquisa", async () => {
        await request(app).post("/surveys").send(
            {
                title: 'Title.example2',
                description: "Description.example2"
            });
        const response = await request(app).get("/surveys");
        expect(response.body.length).toBe(2);

    })

});