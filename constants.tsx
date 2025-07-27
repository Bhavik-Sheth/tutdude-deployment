import React from 'react';
import type { StockItem, Store, VendorType, Basket } from './types';

// SVG Icons for Vendor Types
const PaniPuriIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.828a4 4 0 100-5.656 4 4 0 000 5.656z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.5v-1.5m0-11V3.5" />
  </svg>
);

const ChaatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L7 4z" />
  </svg>
);

const PavBhajiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 009-9h-9v9z" />
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 01-9-9h9v9z" />
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12a9 9 0 019-9v9H3z" />
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 00-9-9v9h9z" />
  </svg>
);

const SandwichIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MomosIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"/>
    </svg>
);

export const VENDOR_TYPES: VendorType[] = [
  { id: 'pani-puri', name: 'Pani Puri', icon: <PaniPuriIcon /> },
  { id: 'chaat', name: 'Chaat', icon: <ChaatIcon /> },
  { id: 'pav-bhaji', name: 'Pav Bhaji', icon: <PavBhajiIcon /> },
  { id: 'sandwiches', name: 'Sandwiches', icon: <SandwichIcon /> },
  { id: 'momos', name: 'Momos', icon: <MomosIcon /> },
  { id: 'other', name: 'Other', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg> },
];

export const MOCK_STOCK_DATA: StockItem[] = [
  { id: 'potato', name: 'Potato', image: 'https://picsum.photos/id/1080/200', price: 30, unit: 'kg', count: 100 },
  { id: 'onion', name: 'Onion', image: 'https://picsum.photos/id/106/200', price: 40, unit: 'kg', count: 80 },
  { id: 'tomato', name: 'Tomato', image: 'https://picsum.photos/id/1079/200', price: 50, unit: 'kg', count: 60 },
  { id: 'noodles', name: 'Noodles', image: 'https://picsum.photos/id/431/200', price: 25, unit: 'pack', count: 50 },
  { id: 'capsicum', name: 'Capsicum', image: 'https://picsum.photos/id/1015/200', price: 60, unit: 'kg', count: 40 },
  { id: 'coriander', name: 'Coriander', image: 'https://picsum.photos/id/1016/200', price: 10, unit: 'bunch', count: 150 },
  { id: 'bread', name: 'Bread Loaf', image: 'https://picsum.photos/id/312/200', price: 45, unit: 'loaf', count: 30 },
  { id: 'butter', name: 'Butter', image: 'https://picsum.photos/id/292/200', price: 55, unit: 'pack', count: 45 },
  { id: 'cheese', name: 'Cheese Slices', image: 'https://picsum.photos/id/319/200', price: 120, unit: 'pack', count: 25 },
  { id: 'paneer', name: 'Paneer', image: 'https://picsum.photos/id/405/200', price: 100, unit: '200g', count: 35 },
  { id: 'maida', name: 'Refined Flour', image: 'https://picsum.photos/id/433/200', price: 50, unit: 'kg', count: 20 },
  { id: 'cabbage', name: 'Cabbage', image: 'https://picsum.photos/id/575/200', price: 25, unit: 'pc', count: 30 },
];

export const BASKETS: Basket[] = [
  { id: 'pav-bhaji-basket', name: 'Pav Bhaji Basket', itemIds: ['potato', 'onion', 'tomato', 'capsicum', 'butter', 'bread'] },
  { id: 'chaat-basket', name: 'Chaat Basket', itemIds: ['potato', 'onion', 'coriander', 'tomato'] },
  { id: 'chinese-basket', name: 'Chinese Basket', itemIds: ['noodles', 'cabbage', 'capsicum', 'onion'] },
  { id: 'sandwich-basket', name: 'Sandwich Basket', itemIds: ['bread', 'tomato', 'onion', 'cheese', 'butter'] },
];

export const STORES: Store[] = [
  { id: 's1', name: 'Jayanagar Central', area: 'Jayanagar 4th Block', hours: '8am - 9pm', isOpen: true },
  { id: 's2', name: 'Koramangala Hub', area: 'Koramangala 5th Block', hours: '9am - 10pm', isOpen: true },
  { id: 's3', name: 'Indiranagar Depot', area: 'Indiranagar 100ft Road', hours: '8am - 8pm', isOpen: false },
  { id: 's4', name: 'Marathahalli Express', area: 'Outer Ring Road', hours: '7am - 11pm', isOpen: true },
];

export const TIME_SLOTS = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
];
