import ProductRepositoryInterface from "../../domain/product/repository/product-repository.interface";
import { UseCase } from "../common/usecase.interface";
import { PersistenceUseCase } from "../common/usecase.persistence";

export abstract class AbstractProductUseCase<I, O> 
    extends PersistenceUseCase<ProductRepositoryInterface>
    implements UseCase<I, O> {

    abstract execute(input: I): Promise<O>;
}