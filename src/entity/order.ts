import { OrderItem } from "./order_item";

class Order {

    _id: string;
    _customerId: string;
    _items: OrderItem[];

    constructor(id: string, customerId: string, _items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = _items;
    }
}