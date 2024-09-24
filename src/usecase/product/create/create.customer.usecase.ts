import ProductFactory from "../../../domain/product/factory/product.factory";
import { AbstractProductUseCase } from "../product.usecase.abstract";
import { InputProductDto, OutputProductDto } from "./create.product.dto";

export default class CreateProductUseCase 
    extends AbstractProductUseCase<InputProductDto, OutputProductDto> {

    async execute(input: InputProductDto): Promise<OutputProductDto> {
        const product = ProductFactory.create("a", input.name, input.price);
        await this.repository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}