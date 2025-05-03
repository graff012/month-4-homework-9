export class CreateOrderDto {
  userId: number;
  products: { productId: number; quantity: number }[];
  totalAmount: number;
  status: string;
}
