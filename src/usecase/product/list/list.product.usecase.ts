
import ProductInterface from "../../../domain/product/entity/product.interface";
import { AbstractProductUseCase } from "../product.usecase.abstract";
import { InputListProductDto, OutputListProductDto } from "./list.product.usecase.dto";

export class ListProductsUseCase
    extends AbstractProductUseCase<InputListProductDto, OutputListProductDto> {

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const result = await this.repository.findAll();
        const products = result.map(this.convertEntityToOutput)
        return {
            products
        };
    }

    private convertEntityToOutput(entity: ProductInterface) {
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price
        }
    }

}