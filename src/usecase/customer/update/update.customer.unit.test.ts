import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const address = new Address(
    "Street",
    123,
    "zip",
    "city",
)
const customer = CustomerFactory
    .createWithAddress("Jhon", address)

const input = {
    id: customer.id,
    name: "Jhon Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated"
    }
}

const mockRepository = (): CustomerRepositoryInterface => {
    return {
        find: jest.fn().mockResolvedValue(customer),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = mockRepository()
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

        const output = await customerUpdateUseCase.execute(input)
        expect(output).toEqual(input);
    })
})
