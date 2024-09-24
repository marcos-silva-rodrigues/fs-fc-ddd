import { AbstractProductUseCase } from "../product.usecase.abstract";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase
    extends AbstractProductUseCase<InputFindProductDto, OutputFindProductDto> {

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.repository.find(input.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }


}