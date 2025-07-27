
import React from 'react';
import type { Store, VendorType, Product } from './types';

export const PaniPuriIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
    <path d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    <path d="M12 9.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" />
  </svg>
);

export const ChaatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 11.01L3 11v2h18zM3 16h18v2H3zM21 6H3v2.01L21 8z" />
  </svg>
);

export const PavBhajiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 15.5v2h20v-2H2zm0-4v2h20v-2H2zm0-4v2h20v-2H2z" clipRule="evenodd" fillRule="evenodd" />
    <path d="M19.33 3H4.67C3.75 3 3 3.75 3 4.67v14.67C3 20.25 3.75 21 4.67 21h14.67c.92 0 1.67-.75 1.67-1.67V4.67C21 3.75 20.25 3 19.33 3zM19 19H5V5h14v14z" />
  </svg>
);

export const SandwichIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.47 3.47a.75.75 0 00-1.06-1.06L2.69 17.13a.75.75 0 00.53 1.28H21a1 1 0 001-1V4a.75.75 0 00-.53-.72L18.47 3.47zM5.56 16.91L17.5 4.98V16H6.1a.75.75 0 00-.54.91z" />
  </svg>
);

export const MomosIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.1 4.14 2.75 5.25C6.56 14.24 5 16.41 5 19v1h14v-1c0-2.59-1.56-4.76-3.75-5.75C16.9 12.14 18 10.21 18 8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 10c2.97 0 5.45 2.16 5.92 5H6.08C6.55 16.16 9.03 14 12 14z" />
  </svg>
);

export const OtherIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v8h2v-8c2.21 0 4-1.79 4-4V2h-2v7z" />
  </svg>
);

export const STORES: Store[] = [
  { id: 's1', name: 'FreshStock - Sector 45', area: 'Mumbai, 400016', hours: '6 AM - 8 PM', isOpen: true },
  { id: 's2', name: 'FreshStock - Dadar', area: 'Mumbai, 400028', hours: '7 AM - 9 PM', isOpen: true },
  { id: 's3', name: 'FreshStock - Thane West', area: 'Thane, 400601', hours: '6 AM - 8 PM', isOpen: false },
  { id: 's4', name: 'FreshStock - Navi Mumbai', area: 'Navi Mumbai, 400703', hours: '8 AM - 10 PM', isOpen: true },
];

export const VENDOR_TYPES: VendorType[] = [
  { id: 'vt1', name: 'Pani Puri', icon: <PaniPuriIcon /> },
  { id: 'vt2', name: 'Chaat', icon: <ChaatIcon /> },
  { id: 'vt3', name: 'Pav Bhaji', icon: <PavBhajiIcon /> },
  { id: 'vt4', name: 'Sandwiches', icon: <SandwichIcon /> },
  { id: 'vt5', name: 'Momos', icon: <MomosIcon /> },
  { id: 'vt6', name: 'Other', icon: <OtherIcon /> },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Tomato', price: 40, unit: 'kg', image: 'https://picsum.photos/id/1080/200/200', inStock: true },
  { id: 'p2', name: 'Onion', price: 30, unit: 'kg', image: 'https://picsum.photos/id/292/200/200', inStock: true },
  { id: 'p3', name: 'Potato', price: 25, unit: 'kg', image: 'https://picsum.photos/id/1078/200/200', inStock: true },
  { id: 'p4', name: 'Coriander', price: 10, unit: 'bunch', image: 'https://picsum.photos/id/106/200/200', inStock: false },
  { id: 'p5', name: 'Green Chillies', price: 50, unit: 'kg', image: 'https://picsum.photos/id/425/200/200', inStock: true },
  { id: 'p6', name: 'Lemon', price: 5, unit: 'piece', image: 'https://picsum.photos/id/211/200/200', inStock: true },
  { id: 'p7', name: 'Maida Flour', price: 45, unit: 'kg', image: 'https://picsum.photos/id/431/200/200', inStock: true },
  { id: 'p8', name: 'Cooking Oil', price: 150, unit: 'litre', image: 'https://picsum.photos/id/355/200/200', inStock: false },
];
