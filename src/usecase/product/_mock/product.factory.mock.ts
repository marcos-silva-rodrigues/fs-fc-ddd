import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class MockProductFactory {
    static getProduct(): ProductInterface {
        return ProductFactory.create("a", "Product 1", 10);
    }
}