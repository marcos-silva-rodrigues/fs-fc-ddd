import CreateProductUseCase from "./create.product.usecase";
import MockProductRepository from "../_mock/product.repository.mock";


describe("Unit test create a product", () => {
    it("should thrown an error when name is missing", async () => {
        const productRepository = MockProductRepository.productRepository(
            new Map()
        );
        const usecase = new CreateProductUseCase(productRepository);

        expect(() => {
            return usecase.execute({
                name: "",
                price: 1
            });
        }).rejects.toThrow("Name is required")
    });

    it("should thrown an error when price is minor than 0", async () => {
        const productRepository = MockProductRepository.productRepository(
            new Map()
        );
        const usecase = new CreateProductUseCase(productRepository);

        expect(() => {
            return usecase.execute({
                name: "Product 1",
                price: 0
            });
        }).rejects.toThrow("Price must be greater than 0")
    });

    it("should create a product", async () => {
        const productRepository = MockProductRepository.productRepository(
            new Map()
        );
        const usecase = new CreateProductUseCase(productRepository);
        const input = {
            name: "Product 1",
            price: 10
        }
        const output = await usecase.execute(input);

        expect(output.id).toEqual(expect.any(String));
        expect(output.name).toBe(input.name);
        expect(output.price).toBe(input.price);
    });
})