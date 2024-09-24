import { Product } from "../../../domain/product/entity/product";
import { AbstractProductUseCase } from "../product.usecase.abstract";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.usecase.dto";

export class UpdateProductUseCase
    extends AbstractProductUseCase<InputUpdateProductDto, OutputUpdateProductDto> {
    
    
    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
       const product = await this.findEntity(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.repository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }

    private async findEntity(id: string) {
        const productModel = await this.repository.find(id);

        return new Product(productModel.id, productModel.name, productModel.price);
    }
}