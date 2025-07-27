import React, { useState, useCallback } from 'react';
import { Page, type Order, type StockItem, type OrderItem } from './types';
import { MOCK_STOCK_DATA } from './constants';
import HomePage from './components/HomePage';
import VendorApp from './components/VendorApp';
import EmployeeApp from './components/EmployeeApp';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [stock, setStock] = useState<StockItem[]>(MOCK_STOCK_DATA);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastVendorOrder, setLastVendorOrder] = useState<Order | null>(null);
  
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const updateStock = useCallback((productId: string, change: number) => {
    setStock(prevStock =>
      prevStock.map(item =>
        item.id === productId ? { ...item, count: Math.max(0, item.count + change) } : item
      )
    );
  }, []);

  const addOrder = useCallback((newOrder: Order) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);

    // Deduct stock for the new order
    newOrder.items.forEach(orderItem => {
      updateStock(orderItem.productId, -orderItem.quantity);
    });

    if (newOrder.source === 'vendor') {
      setLastVendorOrder(newOrder);
    }
  }, [updateStock]);

  const completeOrder = useCallback((orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'completed' } : order
      )
    );
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case Page.VENDOR:
        return (
          <VendorApp
            stock={stock}
            orders={orders.filter(o => o.source === 'vendor')}
            addOrder={addOrder}
            navigateToHome={() => navigateTo(Page.HOME)}
            lastVendorOrder={lastVendorOrder}
            setLastVendorOrder={setLastVendorOrder}
          />
        );
      case Page.EMPLOYEE:
        return (
          <EmployeeApp
            stock={stock}
            orders={orders}
            updateStock={updateStock}
            addOrder={addOrder}
            completeOrder={completeOrder}
            navigateToHome={() => navigateTo(Page.HOME)}
          />
        );
      case Page.HOME:
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      {renderCurrentPage()}
    </div>
  );
}