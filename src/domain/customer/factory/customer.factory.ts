import { v4 as uuid } from "uuid";
import { Customer } from "../entity/customer";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import { Address } from "../value-object/address";

export default class CustomerFactory {
    static create(name: string): Customer {
        return new Customer(uuid(), name, new EventDispatcher());
    }

    static createWithAddress(name: string, address: Address): Customer {
        const customer = new Customer(uuid(), name, new EventDispatcher());
        customer.changeAddress(address);
        return customer;
    }
}