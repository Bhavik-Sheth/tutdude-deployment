
import type { ReactNode } from 'react';

export enum Screen {
  Splash,
  SelectStore,
  SelectVendorType,
  BrowseProducts,
  PickupTime,
  OrderConfirmation,
  PastOrders
}

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
  icon: ReactNode;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  pickupTime: string;
  store: Store;
  date: string;
}
