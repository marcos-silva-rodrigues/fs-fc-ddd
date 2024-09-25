import ValidatorInterface from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/customer";
import * as yup from "yup";

export class CustomerYupValidator
    implements ValidatorInterface<Customer> {


    validate(entity: Customer): void {
        try {
            yup.object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required")
                })
                .validateSync({
                    id: entity.id,
                    name: entity.name,
                }, {
                    abortEarly: false
                })
        } catch (err) {
            const { errors }= err as yup.ValidationError;
            errors.forEach(error => {
                entity.notification.addError({
                    context: "customer",
                    message: error
                })
            })
        }
    }
}