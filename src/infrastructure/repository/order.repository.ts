
import { Sequelize } from "sequelize-typescript";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import { Op, where } from "sequelize";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [OrderItemModel]
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.sequelize.transaction(async t => {
      const order_items_id = entity.items.map(i => i.id);

      // Adiciona novos items

      for (const item of entity.items) {
        const [_, created] = await OrderItemModel.findOrCreate({
          where: { id: item.id },
          defaults: {
            id: item.id,
            product_id: item.productId,
            order_id: entity.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          },
          transaction: t
        });

        if (!created) {
          await OrderItemModel.update({
            product_id: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          }, {
            where: { id: item.id },
            transaction: t
          });
        }
      }

      // remover os antigos
      await OrderItemModel.destroy({
        where: {
          id: {
            [Op.notIn]: order_items_id
          }
        },
        transaction: t
      });

      // Atualizar
      await OrderModel.update(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          where: { id: entity.id },
          transaction: t
        }
      );
    });
  }

  async find(id: string): Promise<Order> {
    const model = await OrderModel.findOne({
      where: { id: id },
      include: [OrderItemModel]
    });

    const items = this.convertOrderItems(model.items);

    return new Order(model.id, model.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    const models = await OrderModel.findAll({
      include: [OrderItemModel]
    });

    const orders = models.map(model => {
      const items = this.convertOrderItems(model.items);
      return new Order(model.id, model.customer_id, items);
    });

    return orders;
  }

  private convertOrderItems(orderItems: OrderItemModel[]): OrderItem[] {
    return orderItems.map(item => new OrderItem(
      item.id,
      item.product_id,
      item.name,
      item.price,
      item.quantity
    ));
  }
}