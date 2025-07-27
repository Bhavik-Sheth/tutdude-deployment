export enum Page {
  HOME,
  VENDOR,
  EMPLOYEE,
}

// Vendor App Types
export interface Store {
  id: string;
  name: string;
  area: string;
  hours: string;
  isOpen: boolean;
}

export interface VendorType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
}

// Employee App Types
export interface Basket {
  id: string;
  name: string;
  itemIds: string[];
}

// Shared Types
export interface StockItem extends Product {
  count: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed';
  bookingTime?: string; // For employee-booked orders
  pickupSlot?: string; // For vendor-booked orders
  storeId?: string; // For vendor-booked orders
  source: 'vendor' | 'employee';
  createdAt: Date;
}
