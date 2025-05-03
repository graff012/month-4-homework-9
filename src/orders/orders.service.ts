import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  create(createOrderDto: CreateOrderDto) {
    const newOrder = {
      id: this.orders.length + 1,
      ...createOrderDto,
      date: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    return this.orders.find(order => order.id === id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
      this.orders[orderIndex] = {
        ...this.orders[orderIndex],
        ...updateOrderDto,
      };
      return this.orders[orderIndex];
    }
    return null;
  }

  remove(id: number) {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
      const deletedOrder = this.orders[orderIndex];
      this.orders.splice(orderIndex, 1);
      return deletedOrder;
    }
    return null;
  }
}
