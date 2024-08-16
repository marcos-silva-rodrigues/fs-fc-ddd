import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/address";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import { Product } from "../../domain/entity/product";
import { OrderItem } from "../../domain/entity/order_item";
import { Order } from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import EventDispatcher from "../../domain/event/@shared/event-dispatcher";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  async function setupProductAndCustomer(): Promise<Product> {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1", new EventDispatcher());
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    return product;
  }

  it("should create a new order", async () => {
    const product = await setupProductAndCustomer();
    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );
    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update a order", async () => {
    const product = await setupProductAndCustomer();
    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });

    orderItem.plusQuantity()
    const orderItem2 = new OrderItem("2", product.id, product.name, product.price, 1)
    order.addItem(orderItem2);
    await orderRepository.update(order);

    const orderModelUpdated = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });

    expect(orderModelUpdated.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: "123",
          product_id: "123",
        }
      ],
    });

  });

  it("should find a order", async () => {
    const product = await setupProductAndCustomer();
    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const foundOrder = await orderRepository.find(order.id);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: foundOrder.id,
      customer_id: foundOrder.customerId,
      total: foundOrder.total(),
      items: foundOrder.items.map(item =>
      ({
        id: item.id,
        name: item.name,
        order_id: item.order_id,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
      })
      ),
    });

  });

  it("should find all order", async () => {
    const product = await setupProductAndCustomer();
    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product.id,
      product.name,
      product.price,
      3
    );

    const order = new Order("123", "123", [orderItem]);

    const order2 = new Order("321", "123", [orderItem2]);
    
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toHaveLength(2);
    expect(foundOrders).toContainEqual(order);
    expect(foundOrders).toContainEqual(order2);
  });

});