import MockProductFactory from "../mock/product.factory.mock";
import MockProductRepository from "../mock/product.repository.mock";
import { ListProductsUseCase } from "./list.product.usecase";

describe("Unit test list products usecase" ,() => {
    it("should return a product list", async () => {
        const product = MockProductFactory.getProduct();
        const extendedMockMethod = new Map();
        extendedMockMethod.set("findAll", jest.fn().mockResolvedValue([product]))
        const productRepository = MockProductRepository.productRepository(extendedMockMethod);

        const input = {};
        const usecase = new ListProductsUseCase(productRepository);
        const output = await usecase.execute(input);

        expect(output.products.length).toBe(1);
        expect(output.products[0].id).toBe(product.id);
        expect(output.products[0].name).toBe(product.name);
        expect(output.products[0].price).toBe(product.price);
    })
})