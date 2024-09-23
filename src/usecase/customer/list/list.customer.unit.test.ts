import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 =  CustomerFactory.createWithAddress(
    "John Doe",
    new Address("Street 1", 1, "1234", "City 1")
);

const customer2 =  CustomerFactory.createWithAddress(
    "Jane Doe",
    new Address("Street 2", 2, "4321", "City 2")
);

const mockRepository = (): CustomerRepositoryInterface => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockResolvedValue([customer1, customer2]),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe("Unit test for listing customer usecase", () => {
    it("should list a customer", async () => {
        const repository = mockRepository();
        const usecase = new ListCustomerUseCase(repository);
        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2)
        expect(output.customers[0].id).toBe(customer1.id)
        expect(output.customers[0].name).toBe(customer1.name)
        expect(output.customers[0].address.street).toBe(customer1.address.street)
        
        expect(output.customers[1].id).toBe(customer2.id)
        expect(output.customers[1].name).toBe(customer2.name)
        expect(output.customers[1].address.street).toBe(customer2.address.street)

    })
})