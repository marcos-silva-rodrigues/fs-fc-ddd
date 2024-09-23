import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export default class MockProductRepository {
    static productRepository(extended : Map<FunctionType, jest.Mock>): ProductRepositoryInterface {
        return {
            create: getImplementation(extended, "create"),
            find: getImplementation(extended, "find"),
            update: getImplementation(extended, "update"),
            findAll: getImplementation(extended, "findAll"),
        }
    }
}

const getImplementation = (
    extended: Map<FunctionType, jest.Mock>,
    methodName: FunctionType
): jest.Mock => {
    if (extended.has(methodName)) {
        return extended.get(methodName) as jest.Mock;
    }
    return jest.fn();
}

type FunctionType = keyof ProductRepositoryInterface