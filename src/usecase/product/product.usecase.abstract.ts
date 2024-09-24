import ProductRepositoryInterface from "../../domain/product/repository/product-repository.interface";
import { AbstractUseCase } from "../common/usecase.abstract";

export abstract class AbstractProductUseCase<I, O> 
    extends AbstractUseCase<ProductRepositoryInterface, I, O> {}