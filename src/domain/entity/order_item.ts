import { Order } from "./order";

export class OrderItem {

    private _id: string;
    private _productId: string
    private _name: string;
    private _price: number;
    private _quantity: number;
    private _order: Order;

    constructor(id: string, productId: string, name: string, price: number, quantity: number) {
        this._id = id;
        this._productId = productId
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    get id(): string {
        return this._id;
    }

    get productId(): string {
        return this._productId;
    }

    get price(): number {
        return this._price;
    }

    get name(): string {
        return this._name;
    }

    get quantity(): number {
        return this._quantity;
    }
    get order_id(): string {
        return this._order.id;
    }

    fromOrder(order: Order) {
        this._order = order;
    };

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    plusQuantity() {
        this._quantity += 1;
    }

    minusQuantity() {
        this._quantity -= 1;
    }
}