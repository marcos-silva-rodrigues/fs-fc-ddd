import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Jhon",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "123454"
                }
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Jhon");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("123454");
    })

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "123454"
                }
            });

        expect(response.status).toBe(500);
        expect(response.text).toBe("Name is required");
    })

    it("should list all customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Jhon",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "123454"
                }
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Jhon");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("123454");

        const response2 = await request(app)
            .post("/customers")
            .send({
                name: "Jhon 2",
                address: {
                    street: "Street 2",
                    city: "City 2",
                    number: 321,
                    zip: "43215"
                }
            });

        expect(response2.status).toBe(201);
        expect(response2.body.name).toBe("Jhon 2");
        expect(response2.body.address.street).toBe("Street 2");
        expect(response2.body.address.city).toBe("City 2");
        expect(response2.body.address.number).toBe(321);
        expect(response2.body.address.zip).toBe("43215");

        const listResponse = await request(app)
            .get("/customers")
            .send();
        console.log(listResponse.body)

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customer1 = listResponse.body.customers[0];
        expect(customer1.name).toBe("Jhon");
        expect(customer1.address.street).toBe("Street");

        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Jhon 2");
        expect(customer2.address.street).toBe("Street 2");
    })
});