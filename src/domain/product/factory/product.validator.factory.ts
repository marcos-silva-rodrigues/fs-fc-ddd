import ValidatorInterface from "../../@shared/validator/validator.interface";
import { ProductAbstract } from "../entity/product.abstract";
import { ProductYupValidator } from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<ProductAbstract> {
        return new ProductYupValidator();
    }
}