
import { Sequelize } from "sequelize-typescript";
import MockProductFactory from "../mock/product.factory.mock";
import MockProductRepository from "../mock/product.repository.mock";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration test find a product", () => {
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


    it("should find a product", async () => {
        await ProductModel.create({
            id: "123",
            name: "Product 1",
            price: 10
        });

        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "123"
        }
        const output = await usecase.execute(input);
        console.log(output)
        expect(output).toEqual({
            id: "123",
            name: "Product 1",
            price: 10
        })
    });
})