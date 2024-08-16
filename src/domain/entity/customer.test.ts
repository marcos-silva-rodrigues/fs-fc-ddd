import EventDispatcher from "../event/@shared/event-dispatcher";
import { Address } from "./address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty" , () => {
        expect(() => {
            const customer = new Customer("", "Jown", new EventDispatcher());
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty" , () => {
        expect(() => {
            const customer = new Customer("213", "", new EventDispatcher());
        }).toThrow("Name is required");
    });

    it("should change name" , () => {
        const customer = new Customer("213", "John", new EventDispatcher());
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer" , () => {
        const customer = new Customer("1", "Customer 1", new EventDispatcher());
        const address = new Address("Street 1", 123, "12345-098", "São Paulo");
        customer.address = address;

        customer.activate();

        expect(customer.isActivate()).toBeTruthy();
    });

    it("should deactivate customer" , () => {
        const customer = new Customer("1", "Customer 1", new EventDispatcher());
        customer.deactivate();

        expect(customer.isActivate()).toBeFalsy();
    });

    it("should throw error when address is undefined when you activate a customer" , () => {
        const customer = new Customer("1", "Customer 1", new EventDispatcher());

        expect(() => {
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1", new EventDispatcher());
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

});