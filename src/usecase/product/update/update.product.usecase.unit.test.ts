import MockProductFactory from "../_mock/product.factory.mock";
import MockProductRepository from "../_mock/product.repository.mock";
import { UpdateProductUseCase } from "./update.product.usecase";

describe("Unit test update a product", () => {
    it("should throw error if not found a product", async () => {
        const extendedMockMethod = new Map();
        extendedMockMethod.set("find", jest.fn().mockImplementation(() => {
            throw new Error("Product not found")
        }))
        const productRepository = MockProductRepository.productRepository(extendedMockMethod);
        const usecase = new UpdateProductUseCase(productRepository);
        const input = {
            id: "",
            name: "",
            price: 0
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");

    });

    it("should throw error if name is missing", async () => {
        const product = MockProductFactory.getProduct();

        const extendedMockMethod = new Map();
        extendedMockMethod.set("find", jest.fn().mockImplementation(() => product))
        const productRepository = MockProductRepository.productRepository(extendedMockMethod);
        const usecase = new UpdateProductUseCase(productRepository);
        const input = {
            id: product.id,
            name: "",
            price: 1
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Name is required");
        
    });

    it("should throw error if price is zero", async () => {
        const product = MockProductFactory.getProduct();

        const extendedMockMethod = new Map();
        extendedMockMethod.set("find", jest.fn().mockImplementation(() => product))
        const productRepository = MockProductRepository.productRepository(extendedMockMethod);
        const usecase = new UpdateProductUseCase(productRepository);
        const input = {
            id: product.id,
            name: "Product updated",
            price: 0
        }
        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Price must be greater than 0");
    });

    it("should update a product", async () => {
        const product = MockProductFactory.getProduct();

        const extendedMockMethod = new Map();
        extendedMockMethod.set("find", jest.fn().mockImplementation(() => product))
        const productRepository = MockProductRepository.productRepository(extendedMockMethod);
        const usecase = new UpdateProductUseCase(productRepository);
        const input = {
            id: product.id,
            name: "Product Updated",
            price: 25
        }

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: "Product Updated",
            price: 25
        })
    });
})