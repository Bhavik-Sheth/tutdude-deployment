
export enum Page {
  Login,
  Home,
  BookOrder,
  BookingSuccess,
  CompleteOrder,
  AddStock
}

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  bookingTime: string;
  status: 'pending' | 'completed';
}

export interface StockItem {
  id: string;
  name: string;
  count: number;
}

export interface Basket {
  id: string;
  name: string;
  itemIds: string[];
}