import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Users", () => {
    beforeAll(async () => {

        const connection = await createConnection();
        await connection.runMigrations();
    });
    it("E possivel criar um usuario", async () => {
        const response = await request(app).post("/users").send(
            {
                email: 'user@exemple.com',
                name: "User exemple"
            });
        expect(response.status).toBe(201);
    });
    //Testa tabela do banco

    it("Caso não permita criar um usuario que ja tenha email cadastrado ", async () => {
        const response = await request(app).post("/users").send(
            {
                email: 'user@exemple.com',
                name: "User exemple"
            });
        expect(response.status).toBe(400);
    })
    //testa se o usuario existe 
});