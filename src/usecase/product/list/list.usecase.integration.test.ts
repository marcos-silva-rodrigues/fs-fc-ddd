import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import MockProductFactory from "../mock/product.factory.mock";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductsUseCase } from "./list.product.usecase";

describe("Integration test for list products usecase" ,() => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should return a product list", async () => {
        const product =  MockProductFactory.getProduct();
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price
        });

        const repository = new ProductRepository();
        const usecase = new ListProductsUseCase(repository);

        const input = {};
        const output = await usecase.execute(input);

        expect(output.products.length).toBe(1);
        expect(output.products[0].id).toBe(product.id);
        expect(output.products[0].name).toBe(product.name);
        expect(output.products[0].price).toBe(product.price);
    })
})