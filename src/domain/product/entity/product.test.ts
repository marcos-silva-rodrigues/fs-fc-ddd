import { Product } from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty" , () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrow("product: Id is required");
    });

    it("should throw error when name is empty" , () => {
        expect(() => {
            const product = new Product("p1", "", 100);
        }).toThrow("product: Name is required");
    });

    
    it("should throw error when price is less than 0" , () => {
        expect(() => {
            const product = new Product("p1", "Product 1", 0);
        }).toThrow("product: Price must be greater than 0");
    });

    it("should throw error when name and price is invalid" , () => {
        expect(() => {
            const product = new Product("p1", "", -10);
        }).toThrow("product: Name is required,product: Price must be greater than 0");
    });

    it("should change name" , () => {
        const product = new Product("p1", "Product 1", 20);

        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price" , () => {
        const product = new Product("p1", "Product 1", 100);

        product.changePrice(150);
        expect(product.price).toBe(150);
    });

});