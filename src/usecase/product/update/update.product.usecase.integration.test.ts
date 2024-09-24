import { Sequelize } from "sequelize-typescript";
import MockProductFactory from "../_mock/product.factory.mock";
import MockProductRepository from "../_mock/product.repository.mock";
import { UpdateProductUseCase } from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { v4 as uuid } from "uuid";

describe("Integration test update a product", () => {
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


    it("should throw error if not found a product", async () => {
        const repository = new ProductRepository()
        const usecase = new UpdateProductUseCase(repository);
        const input = {
            id: uuid(),
            name: "Teste",
            price: 1
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");

    });

    it("should update a product", async () => {
        const product = MockProductFactory.getProduct();
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price
        });

        const productRepository = new ProductRepository()
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

        const { dataValues: expectedUpdated } = await ProductModel.findOne({where: {id: product.id}});
        expect(expectedUpdated).toEqual({
            id: product.id,
            name: "Product Updated",
            price: 25
        })
    });
})