import Entity from "../../@shared/entity/entity.abstract";
import ProductInterface from "./product.interface";

export abstract class ProductAbstract 
    extends Entity
    implements ProductInterface 
{
    abstract get name(): string;
    abstract get price(): number;
    
}