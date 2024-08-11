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
        const item1 = new OrderItem("i1", "Item 1", 100, 1);
        const order = new Order("o1", "c1", [item1]);

        let total = order.total();

        expect(total).toBe(100);

        const item2 = new OrderItem("i1", "Item 1", 200, 1);
        const order2 = new Order("o2", "c1", [item1, item2]);

        total = order2.total();

        expect(total).toBe(300);

    });
});