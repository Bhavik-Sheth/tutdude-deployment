
import { StockItem, Basket } from './types';

export const MOCK_STOCK: StockItem[] = [
  { id: 'veg-1', name: 'Potato', count: 100 },
  { id: 'veg-2', name: 'Onion', count: 100 },
  { id: 'veg-3', name: 'Tomato', count: 80 },
  { id: 'veg-4', name: 'Capsicum', count: 50 },
  { id: 'veg-5', name: 'Cabbage', count: 30 },
  { id: 'veg-6', name: 'Carrot', count: 40 },
  { id: 'veg-7', name: 'Green Peas', count: 60 },
  { id: 'veg-8', name: 'Ginger', count: 90 },
  { id: 'veg-9', name: 'Garlic', count: 90 },
  { id: 'veg-10', name: 'Coriander', count: 120 },
  { id: 'veg-11', name: 'Noodles', count: 50 },
  { id: 'veg-12', name: 'Puffed Rice', count: 70 },
  { id: 'veg-13', name: 'Sev', count: 70 },
];

export const BASKETS: Basket[] = [
  {
    id: 'bask-1',
    name: 'Pav Bhaji Basket',
    itemIds: ['veg-1', 'veg-2', 'veg-3', 'veg-4', 'veg-7', 'veg-8', 'veg-9', 'veg-10']
  },
  {
    id: 'bask-2',
    name: 'Chaat Basket',
    itemIds: ['veg-1', 'veg-2', 'veg-3', 'veg-10', 'veg-12', 'veg-13']
  },
  {
    id: 'bask-3',
    name: 'Chinese Basket',
    itemIds: ['veg-2', 'veg-4', 'veg-5', 'veg-6', 'veg-8', 'veg-9', 'veg-11']
  },
  {
    id: 'bask-4',
    name: 'Basic Vegetables',
    itemIds: ['veg-1', 'veg-2', 'veg-3', 'veg-4', 'veg-6']
  }
];
