
import MockProductFactory from "../_mock/product.factory.mock";
import MockProductRepository from "../_mock/product.repository.mock";
import FindProductUseCase from "./find.product.usecase";

describe("Unit test find a product", () => {
    it("should thrown an error when product not found", async () => {
        const mockError = new Map();
        mockError.set("find", jest.fn().mockImplementation(() => {
            throw new Error("Product not found");
        }))
        const productRepository = MockProductRepository.productRepository(
            mockError
        );

        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "123"
        }
        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found")
    });


    it("should find a product", async () => {
        const mockError = new Map();
        const expected = MockProductFactory.getProduct();
        mockError.set("find", jest.fn().mockImplementation(() => expected))
        const productRepository = MockProductRepository.productRepository(
            mockError
        );

        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "123"
        }
        const output = await usecase.execute(input);
    
        expect(output).toEqual({
            id: expected.id,
            name: expected.name,
            price: expected.price
        })
    });
})