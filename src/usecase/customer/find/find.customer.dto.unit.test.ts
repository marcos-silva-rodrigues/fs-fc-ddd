import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { Customer } from "../../../domain/customer/entity/customer";
import EventDispatcher from "../../../domain/@shared/event/event-dispatcher";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";

const customer = new Customer("123", "Jhon", new EventDispatcher());
const address = new Address("Street", 123,  "zip", "city");
customer.changeAddress(address);

const mockRepository = (): CustomerRepositoryInterface => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe("Test find customer use case", () => {
    
    it("should find a customer", async () => {
        
        const customerRepository = mockRepository();
        customerRepository.find = jest.fn().mockResolvedValue(customer);
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Jhon",
            address: {
                street: "Street",
                number: 123,
                city: "city",
                zip: "zip"
            }
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output)
    })

    it("should not find a customer", async () => {
        
        const customerRepository = mockRepository();
        customerRepository.find = jest.fn().mockImplementation(() =>{
            throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);
    
        const input = {
          id: "123",
        };
    
        expect(() => {
          return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
      });
})