import { Customer } from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    constructor(
        private customerRepository: CustomerRepositoryInterface
    ) {}

    async execute(
        input: InputListCustomerDto
    ): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return {
            customers: customers.map(this.convert)
        }
    }

    private convert(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
            }
        }
    }
}

