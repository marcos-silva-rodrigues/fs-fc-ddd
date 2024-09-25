import NotificationError from "../../../domain/@shared/notification/notification.error";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "jhon",
    address: {
        street: "Street",
        number: 123,
        zip: "zip",
        city: "city"
    }
}

const mockRepository = (): CustomerRepositoryInterface => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create a customer", () => {
    it("should create a customer", async () => {
        const customerRepository =  mockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input)
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })
    })

    it("should thrown an error when name is missing", async () => {
        const customerRepository =  mockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        
        expect(() => {
            return customerCreateUseCase.execute(input)
        }).rejects.toThrow("customer: Name is required")
    })

    it("should thrown an error when street is missing", async () => {
        const customerRepository =  mockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        expect(() => {
            return customerCreateUseCase.execute(input)
        }).rejects.toThrow("Street is required")
    })
})

