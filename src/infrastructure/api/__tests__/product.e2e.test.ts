import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("should not create a product with invalid name", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "",
                price: 21
            });

        expect(response.status).toBe(500);
        expect(response.text).toBe("Name is required");
    })


    it("should not create a product with invalid price", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product A",
                price: 0
            });

        expect(response.status).toBe(500);
        expect(response.text).toBe("Price must be greater than 0");
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product A",
                price: 21
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Product A");
        expect(response.body.price).toBe(21);
    })

    it("should list all products", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product A",
                price: 15
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Product A");
        expect(response.body.price).toBe(15);

        const response2 = await request(app)
            .post("/products")
            .send({
                name: "Product B",
                price: 30
            });

        expect(response2.status).toBe(201);

        expect(response2.body.name).toBe("Product B");
        expect(response2.body.price).toBe(30);

        const listResponse = await request(app)
            .get("/products")
            .send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const productA = listResponse.body.products[0];
        expect(productA.name).toBe("Product A");
        expect(productA.price).toBe(15);

        const productB = listResponse.body.products[1];
        expect(productB.name).toBe("Product B");
        expect(productB.price).toBe(30);
    })
});