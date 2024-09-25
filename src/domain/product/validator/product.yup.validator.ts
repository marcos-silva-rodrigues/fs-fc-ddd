import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from "yup";
import { ProductAbstract } from "../entity/product.abstract";

export class ProductYupValidator
    implements ValidatorInterface<ProductAbstract> {


    validate(entity: ProductAbstract): void {
        try {
            yup.object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required"),
                    price: yup.number().required().positive("Price must be greater than 0"),
                })
                .validateSync({
                    id: entity.id,
                    name: entity.name,
                    price: entity.price
                    }, {
                        abortEarly: false
                    })
        } catch (err) {
            const { errors }= err as yup.ValidationError;
            errors.forEach(error => {
                entity.notification.addError({
                    context: "product",
                    message: error
                })
            })
        }
    }
}