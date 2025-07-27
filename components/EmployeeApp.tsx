import React, { useState, useMemo } from 'react';
import type { StockItem, Order, OrderItem, Basket } from '../types';
import { BASKETS, TIME_SLOTS } from '../constants';

type EmployeePage = 'LOGIN' | 'DASHBOARD' | 'BOOK_ORDER' | 'COMPLETE_ORDER' | 'MANAGE_STOCK' | 'ORDER_SUCCESS';

interface EmployeeAppProps {
  stock: StockItem[];
  orders: Order[];
  updateStock: (productId: string, change: number) => void;
  addOrder: (order: Order) => void;
  completeOrder: (orderId: string) => void;
  navigateToHome: () => void;
}

const EmployeeApp: React.FC<EmployeeAppProps> = ({ stock, orders, updateStock, addOrder, completeOrder, navigateToHome }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<EmployeePage>('DASHBOARD');
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const handleLogin = (id: string, pass: string) => {
    // Demo login: allow if fields are not empty
    if (id && pass) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('DASHBOARD'); // Reset to dashboard after logout
  };
  
  const handleBookOrder = (items: OrderItem[], bookingTime: string) => {
    const total = items.reduce((acc, item) => {
        const product = stock.find(s => s.id === item.productId);
        return acc + (product ? product.price * item.quantity : 0);
    }, 0);
    const newOrder: Order = {
        id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        items,
        total,
        status: 'pending',
        bookingTime,
        source: 'employee',
        createdAt: new Date(),
    };
    addOrder(newOrder);
    setLastOrderId(newOrder.id);
    setCurrentPage('ORDER_SUCCESS');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} navigateToHome={navigateToHome} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'DASHBOARD':
        return <DashboardScreen onNavigate={setCurrentPage} onLogout={handleLogout} navigateToHome={navigateToHome} />;
      case 'BOOK_ORDER':
        return <BookOrderScreen stock={stock} onBookOrder={handleBookOrder} onBack={() => setCurrentPage('DASHBOARD')} />;
      case 'COMPLETE_ORDER':
        return <CompleteOrderScreen orders={orders} onCompleteOrder={completeOrder} onBack={() => setCurrentPage('DASHBOARD')} stock={stock} />;
      case 'MANAGE_STOCK':
        return <ManageStockScreen stock={stock} updateStock={updateStock} onBack={() => setCurrentPage('DASHBOARD')} />;
      case 'ORDER_SUCCESS':
        return <OrderSuccessScreen orderId={lastOrderId} onDone={() => setCurrentPage('DASHBOARD')} />;
      default:
        return <DashboardScreen onNavigate={setCurrentPage} onLogout={handleLogout} navigateToHome={navigateToHome}/>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 p-4 sm:p-6 md:p-8">
      {renderContent()}
    </div>
  );
};

// Sub-components for Employee App

const LoginScreen: React.FC<{ onLogin: (id: string, pass: string) => void, navigateToHome: () => void; }> = ({ onLogin, navigateToHome }) => {
    const [outletId, setOutletId] = useState('');
    const [passkey, setPasskey] = useState('');

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-900">Outlet Login</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Enter Outlet ID" value={outletId} onChange={e => setOutletId(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800" />
                    <input type="password" placeholder="Enter Passkey" value={passkey} onChange={e => setPasskey(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800" />
                </div>
                <button onClick={() => onLogin(outletId, passkey)} className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400">Login</button>
                 <button onClick={navigateToHome} className="w-full py-2 mt-4 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Return to Main Menu
                </button>
            </div>
        </div>
    );
};

const DashboardScreen: React.FC<{ onNavigate: (page: EmployeePage) => void; onLogout: () => void, navigateToHome: () => void }> = ({ onNavigate, onLogout, navigateToHome }) => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
                 <div>
                    <button onClick={navigateToHome} className="mr-4 px-4 py-2 font-semibold text-sm bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition">Main Menu</button>
                    <button onClick={onLogout} className="px-4 py-2 font-semibold text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Logout</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div onClick={() => onNavigate('BOOK_ORDER')} className="p-6 bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:border-green-400 transition">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Book Order</h3>
                    <p className="text-gray-600">Create a new order for a customer.</p>
                </div>
                <div onClick={() => onNavigate('COMPLETE_ORDER')} className="p-6 bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:border-green-400 transition">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Complete Order</h3>
                    <p className="text-gray-600">View pending orders and mark them as completed.</p>
                </div>
                <div onClick={() => onNavigate('MANAGE_STOCK')} className="p-6 bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:border-green-400 transition">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Add Stock</h3>
                    <p className="text-gray-600">Update inventory levels.</p>
                </div>
            </div>
        </div>
    );
};

const BookOrderScreen: React.FC<{ stock: StockItem[], onBookOrder: (items: OrderItem[], time: string) => void, onBack: () => void }> = ({ stock, onBookOrder, onBack }) => {
    const [selectedBasket, setSelectedBasket] = useState<Basket | null>(null);
    const [orderItems, setOrderItems] = useState<Map<string, number>>(new Map());
    const [bookingTime, setBookingTime] = useState('');

    const handleItemChange = (itemId: string, change: number) => {
        const currentQty = orderItems.get(itemId) || 0;
        const stockItem = stock.find(s => s.id === itemId);
        const newQty = Math.max(0, currentQty + change);
        
        if (stockItem && newQty <= stockItem.count) {
            const newOrderItems = new Map(orderItems);
            if (newQty === 0) {
                newOrderItems.delete(itemId);
            } else {
                newOrderItems.set(itemId, newQty);
            }
            setOrderItems(newOrderItems);
        }
    };
    
    const handleSelectBasket = (basket: Basket) => {
        setSelectedBasket(basket);
        const newOrderItems = new Map<string, number>();
        basket.itemIds.forEach(id => newOrderItems.set(id, 0));
        setOrderItems(newOrderItems);
    };

    const handleSubmit = () => {
        const finalItems: OrderItem[] = Array.from(orderItems.entries())
            .filter(([, quantity]) => quantity > 0)
            .map(([productId, quantity]) => ({ productId, quantity }));
        if (finalItems.length > 0 && bookingTime) {
            onBookOrder(finalItems, bookingTime);
        } else {
            alert("Please add items and select a booking time.");
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto">
            <button onClick={onBack} className="mb-6 px-4 py-2 font-semibold bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"> &larr; Back to Dashboard</button>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Book Order for Customer</h2>
            
            <div className="bg-white p-6 rounded-xl mb-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">1. Select a Basket</h3>
              <div className="flex flex-wrap gap-4">
                  {BASKETS.map(basket => (
                      <button key={basket.id} onClick={() => handleSelectBasket(basket)} className={`px-4 py-2 rounded-lg font-semibold transition ${selectedBasket?.id === basket.id ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>{basket.name}</button>
                  ))}
              </div>
            </div>

            {selectedBasket && (
                <div className="bg-white p-6 rounded-xl mb-6 shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">2. Adjust Items</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedBasket.itemIds.map(itemId => {
                            const item = stock.find(s => s.id === itemId);
                            const quantity = orderItems.get(itemId) || 0;
                            if (!item) return null;
                            return (
                                <div key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">In Stock: {item.count}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => handleItemChange(item.id, -1)} disabled={quantity === 0} className="w-8 h-8 rounded-full bg-red-600 text-white font-bold disabled:bg-gray-400">-</button>
                                        <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
                                        <button onClick={() => handleItemChange(item.id, 1)} disabled={quantity >= item.count} className="w-8 h-8 rounded-full bg-green-600 text-white font-bold disabled:bg-gray-400">+</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {selectedBasket && (
                <div className="bg-white p-6 rounded-xl mb-6 shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">3. Select Booking Time</h3>
                    <select value={bookingTime} onChange={e => setBookingTime(e.target.value)} required className="w-full max-w-xs px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800">
                        <option value="" disabled>-- Select a time slot --</option>
                        {TIME_SLOTS.map(slot => (
                            <option key={slot} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <button onClick={handleSubmit} disabled={Array.from(orderItems.values()).every(q => q === 0) || !bookingTime} className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400">Book Order</button>
        </div>
    );
};

const CompleteOrderScreen: React.FC<{ orders: Order[], onCompleteOrder: (orderId: string) => void, onBack: () => void, stock: StockItem[] }> = ({ orders, onCompleteOrder, onBack, stock }) => {
    const [search, setSearch] = useState('');
    const pendingOrders = useMemo(() => 
        orders.filter(o => o.status === 'pending')
              .filter(o => o.id.toLowerCase().includes(search.toLowerCase())),
    [orders, search]);
    
    return (
        <div className="max-w-7xl mx-auto">
            <button onClick={onBack} className="mb-6 px-4 py-2 font-semibold bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"> &larr; Back to Dashboard</button>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Complete Pending Orders</h2>
            <input type="text" placeholder="Search by Order ID..." value={search} onChange={e => setSearch(e.target.value)} className="w-full mb-6 px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800" />
            <div className="space-y-4">
                {pendingOrders.length > 0 ? pendingOrders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <div className="flex flex-wrap justify-between items-start gap-4">
                           <div>
                            <p className="font-bold text-lg text-gray-800">{order.id}</p>
                            <p className="text-sm text-gray-500">Time: {order.bookingTime || new Date(order.createdAt).toLocaleTimeString()}</p>
                            <p className="text-sm text-gray-500">Source: <span className={`font-semibold capitalize ${order.source === 'vendor' ? 'text-blue-600' : 'text-purple-600'}`}>{order.source}</span></p>
                           </div>
                           <button onClick={() => onCompleteOrder(order.id)} className="px-4 py-2 font-semibold text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition">Mark as Completed</button>
                        </div>
                        <ul className="mt-3 list-disc list-inside text-gray-600">
                          {order.items.map(item => (
                            <li key={item.productId}>{stock.find(s => s.id === item.productId)?.name || item.productId} x {item.quantity}</li>
                          ))}
                        </ul>
                    </div>
                )) : <p className="text-center text-gray-500 py-8">No pending orders found.</p>}
            </div>
        </div>
    );
};

const ManageStockScreen: React.FC<{ stock: StockItem[], updateStock: (id: string, change: number) => void, onBack: () => void }> = ({ stock, updateStock, onBack }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={onBack} className="mb-6 px-4 py-2 font-semibold bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"> &larr; Back to Dashboard</button>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Manage Stock</h2>
            <div className="space-y-3">
                {stock.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow border border-gray-200">
                        <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-xl text-gray-900">{item.count}</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => updateStock(item.id, -1)} className="w-10 h-10 rounded-full bg-red-600 text-white font-bold text-2xl disabled:bg-gray-400">-</button>
                                <button onClick={() => updateStock(item.id, 1)} className="w-10 h-10 rounded-full bg-green-600 text-white font-bold text-2xl">+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={onBack} className="mt-8 w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition">Done</button>
        </div>
    );
};

const OrderSuccessScreen: React.FC<{ orderId: string | null, onDone: () => void }> = ({ orderId, onDone }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-green-600 mb-4">Order Booked Successfully!</h2>
                <p className="text-gray-600 mb-6">The order has been created with the following ID:</p>
                <p className="text-4xl font-mono font-bold bg-gray-100 text-green-700 py-4 px-6 rounded-lg mb-8">{orderId}</p>
                <button onClick={onDone} className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition">Done</button>
            </div>
        </div>
    );
};

export default EmployeeApp;