
import React, { useState, useCallback } from 'react';
import { Page, Order, StockItem } from './types';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import BookOrderScreen from './components/BookOrderScreen';
import CompleteOrderScreen from './components/CompleteOrderScreen';
import AddStockScreen from './components/AddStockScreen';
import { MOCK_STOCK } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stock, setStock] = useState<StockItem[]>(MOCK_STOCK);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setCurrentPage(Page.Home);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentPage(Page.Login);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleBookOrder = useCallback((newOrder: Omit<Order, 'id' | 'status'>) => {
    const orderId = `ORD${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const orderWithId: Order = {
      ...newOrder,
      id: orderId,
      status: 'pending',
    };
    setOrders(prevOrders => [orderWithId, ...prevOrders]);
    setLastOrderId(orderId);
    setCurrentPage(Page.BookingSuccess);
  }, []);

  const handleCompleteOrder = useCallback((orderId: string) => {
    const orderToComplete = orders.find(order => order.id === orderId);

    if (!orderToComplete) {
      console.error(`Order with id ${orderId} not found.`);
      return;
    }
    
    // Deduct items from stock when an order is completed
    setStock(prevStock => {
      const stockMap = new Map(prevStock.map(item => [item.id, {...item}]));
      
      for (const orderedItem of orderToComplete.items) {
        const stockItem = stockMap.get(orderedItem.itemId);
        if (stockItem) {
          stockItem.count = Math.max(0, stockItem.count - orderedItem.quantity);
        }
      }
      
      return Array.from(stockMap.values());
    });

    // Mark order as completed
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'completed' } : order
      )
    );
  }, [orders]); // Dependency on `orders` to get the correct order to complete

  const handleUpdateStock = useCallback((itemId: string, newCount: number) => {
    setStock(prevStock =>
      prevStock.map(item =>
        item.id === itemId ? { ...item, count: Math.max(0, newCount) } : item
      )
    );
  }, []);

  const renderPage = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case Page.Home:
        return <HomeScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
      case Page.BookOrder:
        return <BookOrderScreen stock={stock} onBookOrder={handleBookOrder} onBack={() => handleNavigate(Page.Home)} />;
      case Page.BookingSuccess:
        return (
          <div className="w-full max-w-lg mx-auto bg-gray-800 border border-green-700 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Order Placed!</h2>
            <p className="text-gray-300 mb-2">Your order has been successfully booked.</p>
            <p className="text-gray-100 font-semibold text-lg mb-6">Order ID: <span className="text-green-400">{lastOrderId}</span></p>
            <button
              onClick={() => handleNavigate(Page.Home)}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
            >
              Done
            </button>
          </div>
        );
      case Page.CompleteOrder:
        return <CompleteOrderScreen orders={orders} onCompleteOrder={handleCompleteOrder} onBack={() => handleNavigate(Page.Home)} />;
      case Page.AddStock:
        return <AddStockScreen stock={stock} onUpdateStock={handleUpdateStock} onBack={() => handleNavigate(Page.Home)} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      {renderPage()}
    </div>
  );
};

export default App;
