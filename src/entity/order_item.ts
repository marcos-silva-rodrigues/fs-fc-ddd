export class OrderItem {

    private _id: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, name: string, price: number, quantity: number) {
        this._id =id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    get price(): number {
        return this._price;
    }

    get name(): string {
        return this._name;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
}