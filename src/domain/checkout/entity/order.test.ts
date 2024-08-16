import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty" , () => {
        expect(() => {
            const order = new Order("", "123", [])
        }).toThrow("Id is required");
    });

    it("should throw error when customerId is empty" , () => {
        expect(() => {
            const order = new Order("123", "", [])
        }).toThrow("CustomerId is required");
    });


    it("should throw error when items are empty" , () => {
        expect(() => {
            const order = new Order("123", "321", [])
        }).toThrow("Items are required");
    });

    it("should calculate total" , () => {
        const item1 = new OrderItem("i1", "p1", "Item 1", 100, 2);
        const order = new Order("o1", "c1", [item1]);

        let total = order.total();

        expect(total).toBe(200);

        const item2 = new OrderItem("i2", "p2", "Item 2", 200, 2);
        const order2 = new Order("o2", "c1", [item1, item2]);

        total = order2.total();

        expect(total).toBe(600);
    });

    it("should throw error if the item qtd is less or equal 0" , () => {
       expect(() => {
        const item1 = new OrderItem("i1", "p1", "Item 1", 100, 0);
        const order = new Order("o1", "c1", [item1]);
       }).toThrow("Quantity must be greater than 0");
    });
});