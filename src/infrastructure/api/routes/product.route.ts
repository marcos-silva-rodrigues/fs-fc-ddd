import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { ListProductsUseCase } from "../../../usecase/product/list/list.product.usecase";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import NotificationError from "../../../domain/@shared/notification/notification.error";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());

    try {
        const input = {
            name: req.body.name,
            price: req.body.price,
        }
        const output = await usecase.execute(input);
        return res.status(201).send(output);
    } catch (err) {
        const { errors } = err as NotificationError;
        res.status(500).json({errors});
    }
})

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductsUseCase(new ProductRepository());

    try {
        const output = await usecase.execute({});
        return res.send(output);
    } catch (err) {
        const { message } = err as Error;
        res.status(500).send(message);
    }
})