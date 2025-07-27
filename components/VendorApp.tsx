import React, { useState, useMemo } from 'react';
import type { StockItem, Order, OrderItem, Store, VendorType } from '../types';
import { STORES, VENDOR_TYPES, TIME_SLOTS } from '../constants';

type VendorPage = 'SPLASH' | 'SELECT_STORE' | 'SELECT_VENDOR_TYPE' | 'BROWSE_PRODUCTS' | 'PICKUP_TIME' | 'CONFIRMATION' | 'PAST_ORDERS';

interface VendorAppProps {
  stock: StockItem[];
  orders: Order[];
  addOrder: (order: Order) => void;
  navigateToHome: () => void;
  lastVendorOrder: Order | null;
  setLastVendorOrder: (order: Order | null) => void;
}

const VendorApp: React.FC<VendorAppProps> = ({ stock, orders, addOrder, navigateToHome, lastVendorOrder, setLastVendorOrder }) => {
  const [page, setPage] = useState<VendorPage>('SPLASH');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [cart, setCart] = useState<Map<string, number>>(new Map());
  const [newlyPlacedOrder, setNewlyPlacedOrder] = useState<Order | null>(null);
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  const cartTotal = useMemo(() => {
    return Array.from(cart.entries()).reduce((total, [productId, quantity]) => {
      const product = stock.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  }, [cart, stock]);

  const cartItemCount = useMemo(() => {
    return Array.from(cart.values()).reduce((total, quantity) => total + quantity, 0);
  }, [cart]);

  const handleStartNewOrder = () => {
    setCart(new Map());
    setSelectedStore(null);
    setLastVendorOrder(null);
    setNewlyPlacedOrder(null);
    setPage('SELECT_STORE');
  };
  
  const handleGoHomeFromConfirmation = () => {
    setCart(new Map());
    setSelectedStore(null);
    setNewlyPlacedOrder(null);
    setPage('SPLASH');
  };

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    setPage('SELECT_VENDOR_TYPE');
  };
  
  const handlePlaceOrder = (pickupSlot: string) => {
    if (!selectedStore || cart.size === 0) return;
    const orderItems: OrderItem[] = Array.from(cart.entries()).map(([productId, quantity]) => ({ productId, quantity }));
    const newOrder: Order = {
        id: `A${Math.floor(1000 + Math.random() * 9000)}`,
        items: orderItems,
        total: cartTotal,
        status: 'pending',
        pickupSlot,
        storeId: selectedStore.id,
        source: 'vendor',
        createdAt: new Date(),
    };
    addOrder(newOrder);
    setNewlyPlacedOrder(newOrder);
    setPage('CONFIRMATION');
  };

  const handleReorder = (order: Order) => {
      const newCart = new Map<string, number>();
      order.items.forEach(item => {
          const product = stock.find(p => p.id === item.productId);
          // Only add to cart if item is in stock
          if (product && product.count > 0) {
              newCart.set(item.productId, Math.min(item.quantity, product.count));
          }
      });
      setCart(newCart);
      setPage('BROWSE_PRODUCTS');
  };

  const renderContent = () => {
    switch (page) {
      case 'SPLASH':
        return <SplashScreen onStartNewOrder={handleStartNewOrder} onShowPastOrders={() => setPage('PAST_ORDERS')} lastOrder={lastVendorOrder} navigateToHome={navigateToHome}/>;
      case 'SELECT_STORE':
        return <SelectStoreScreen onSelect={handleSelectStore} onBack={() => setPage('SPLASH')} />;
      case 'SELECT_VENDOR_TYPE':
        return <SelectVendorTypeScreen onSelect={() => setPage('BROWSE_PRODUCTS')} onBack={() => setPage('SELECT_STORE')} />;
      case 'BROWSE_PRODUCTS':
        return <BrowseProductsScreen stock={stock} cart={cart} setCart={setCart} onPlaceOrderOnCall={() => setShowCallbackModal(true)} onViewOrder={() => setPage('PICKUP_TIME')} cartItemCount={cartItemCount} cartTotal={cartTotal} onBack={() => setPage('SELECT_VENDOR_TYPE')} />;
      case 'PICKUP_TIME':
        return <PickupTimeScreen onConfirm={handlePlaceOrder} onBack={() => setPage('BROWSE_PRODUCTS')} />;
      case 'CONFIRMATION':
        return <OrderConfirmationScreen order={newlyPlacedOrder} onGoHome={handleGoHomeFromConfirmation} />;
      case 'PAST_ORDERS':
        return <PastOrdersScreen orders={orders} onReorder={handleReorder} onBack={() => setPage('SPLASH')} />;
      default:
        return <SplashScreen onStartNewOrder={handleStartNewOrder} onShowPastOrders={() => setPage('PAST_ORDERS')} lastOrder={lastVendorOrder} navigateToHome={navigateToHome}/>;
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      <div className="max-w-full mx-auto min-h-screen relative">
        {renderContent()}
        {showCallbackModal && <CallbackModal onBack={() => setShowCallbackModal(false)} />}
      </div>
    </div>
  );
};

// Sub-components for Vendor App
const SplashScreen: React.FC<{ onStartNewOrder: () => void; onShowPastOrders: () => void; lastOrder: Order | null; navigateToHome: () => void }> = ({ onStartNewOrder, onShowPastOrders, lastOrder, navigateToHome }) => {
    return (
        <div className="p-6 flex flex-col min-h-screen justify-center items-center bg-white text-center">
            <div className="w-full max-w-2xl">
              {lastOrder && (
                  <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-2xl mb-8 shadow-lg">
                      <h3 className="font-bold text-lg">Order Confirmed!</h3>
                      <p>Pickup ID: <span className="font-mono font-bold text-2xl">{lastOrder.id}</span></p>
                      <p>Store: {STORES.find(s => s.id === lastOrder.storeId)?.name}</p>
                      <p>Slot: {lastOrder.pickupSlot}</p>
                  </div>
              )}
                <h1 className="text-5xl font-bold text-green-600">FreshStock</h1>
                <p className="text-lg text-gray-500 mt-1">ताज़ा सामग्री, आसान ऑर्डर</p>
            </div>
            <div className="space-y-4 mt-12 w-full max-w-sm">
                <button onClick={onStartNewOrder} className="w-full py-4 text-lg font-bold bg-green-600 text-white rounded-2xl shadow-md hover:bg-green-700 transition">Start New Order</button>
                <button onClick={onShowPastOrders} className="w-full py-4 text-lg font-bold bg-gray-200 text-gray-800 rounded-2xl shadow-md hover:bg-gray-300 transition">My Past Orders</button>
                <button onClick={navigateToHome} className="w-full py-3 text-md font-semibold text-gray-500 mt-4 hover:text-gray-800 transition">Back to Main Menu</button>
            </div>
        </div>
    );
};

const SelectStoreScreen: React.FC<{ onSelect: (store: Store) => void; onBack: () => void; }> = ({ onSelect, onBack }) => (
    <div className="p-6 max-w-3xl mx-auto">
        <button onClick={onBack} className="mb-4 text-gray-600 hover:text-gray-900">&larr; Back</button>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Select a Store</h2>
        <div className="space-y-4">
            {STORES.map(store => (
                <div key={store.id} onClick={() => store.isOpen && onSelect(store)} className={`p-4 rounded-2xl border-2 transition ${store.isOpen ? 'bg-white border-gray-200 hover:border-green-500 cursor-pointer shadow-sm hover:shadow-md' : 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'}`}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
                        {store.isOpen ? <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Open Now</span> : <span className="text-sm font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">Closed</span>}
                    </div>
                    <p className="text-gray-600">{store.area}</p>
                    <p className="text-gray-600">{store.hours}</p>
                </div>
            ))}
        </div>
    </div>
);

const SelectVendorTypeScreen: React.FC<{ onSelect: (type: VendorType) => void; onBack: () => void; }> = ({ onSelect, onBack }) => (
    <div className="p-6 max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-4 text-gray-600 hover:text-gray-900">&larr; Back</button>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">What do you sell?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {VENDOR_TYPES.map(type => (
                <div key={type.id} onClick={() => onSelect(type)} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl h-32 cursor-pointer border-2 border-gray-200 hover:border-green-500 hover:text-green-600 transition text-gray-700 shadow-sm hover:shadow-lg">
                    <div className="text-green-500">{type.icon}</div>
                    <p className="mt-2 font-semibold">{type.name}</p>
                </div>
            ))}
        </div>
    </div>
);

const BrowseProductsScreen: React.FC<{ stock: StockItem[], cart: Map<string, number>, setCart: React.Dispatch<React.SetStateAction<Map<string, number>>>, onPlaceOrderOnCall: () => void, onViewOrder: () => void, cartItemCount: number, cartTotal: number, onBack: () => void }> = ({ stock, cart, setCart, onPlaceOrderOnCall, onViewOrder, cartItemCount, cartTotal, onBack }) => {
    const [search, setSearch] = useState('');
    
    const handleCartChange = (productId: string, change: number) => {
      const newCart = new Map(cart);
      const currentQty = newCart.get(productId) || 0;
      const newQty = currentQty + change;
      const productStock = stock.find(p => p.id === productId)?.count || 0;
      
      if (newQty > 0 && newQty <= productStock) {
        newCart.set(productId, newQty);
      } else if (newQty <= 0) {
        newCart.delete(productId);
      }
      setCart(newCart);
    };

    const filteredStock = useMemo(() => stock.filter(item => item.name.toLowerCase().includes(search.toLowerCase())), [stock, search]);
    
    return (
        <div className="p-6 pb-28">
            <div className="max-w-7xl mx-auto">
                <button onClick={onBack} className="mb-4 text-gray-600 hover:text-gray-900">&larr; Back</button>
                <input type="text" placeholder="Search for items..." value={search} onChange={e => setSearch(e.target.value)} className="w-full mb-4 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredStock.map(item => {
                        const quantity = cart.get(item.id) || 0;
                        const isOutOfStock = item.count === 0;
                        return (
                            <div key={item.id} className={`rounded-2xl shadow-md border ${isOutOfStock ? 'bg-gray-100 border-gray-200' : 'bg-white border-gray-200'}`}>
                                <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-t-2xl" />
                                <div className="p-3">
                                    <p className="font-bold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">₹{item.price}/{item.unit}</p>
                                    <p className={`text-sm font-semibold ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>{isOutOfStock ? 'Out of Stock' : 'In Stock'}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <button onClick={() => handleCartChange(item.id, -1)} disabled={quantity === 0} className="w-8 h-8 rounded-full bg-red-600 text-white font-bold disabled:bg-gray-400">-</button>
                                        <span className="font-bold text-gray-900">{quantity}</span>
                                        <button onClick={() => handleCartChange(item.id, 1)} disabled={isOutOfStock || quantity >= item.count} className="w-8 h-8 rounded-full bg-green-600 text-white font-bold disabled:bg-gray-400">+</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button onClick={onPlaceOrderOnCall} className="mt-6 w-full max-w-xs mx-auto block py-3 font-semibold text-sm bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition">Place Order on Call</button>
            </div>
            {cartItemCount > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                    <div className="max-w-4xl mx-auto">
                        <button onClick={onViewOrder} className="w-full py-4 text-lg font-bold bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-700 transition">
                            {cartItemCount} items in order - View Order - ₹{cartTotal.toFixed(2)}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const PickupTimeScreen: React.FC<{ onConfirm: (slot: string) => void; onBack: () => void; }> = ({ onConfirm, onBack }) => {
    const [selectedSlot, setSelectedSlot] = useState<string>('');

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <button onClick={onBack} className="mb-4 text-gray-600 hover:text-gray-900">&larr; Back</button>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Select Pickup Time</h2>
             <div className="bg-white p-6 rounded-xl mb-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Slots</h3>
                 <select value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)} required className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800">
                    <option value="" disabled>-- Select a time slot --</option>
                    {TIME_SLOTS.map(slot => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={() => selectedSlot && onConfirm(selectedSlot)} disabled={!selectedSlot} className="mt-8 w-full py-4 text-lg font-bold bg-green-600 text-white rounded-2xl shadow-md hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">Confirm Pickup Time</button>
        </div>
    );
};

const OrderConfirmationScreen: React.FC<{ order: Order | null; onGoHome: () => void; }> = ({ order, onGoHome }) => {
    if (!order) return <div className="p-6 text-center">Loading...</div>;
    return (
        <div className="p-6 text-center flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-lg w-full">
                <div className="bg-green-600 text-white p-6 rounded-t-2xl">
                    <h2 className="text-3xl font-bold">Order Placed!</h2>
                    <p>Show this ID at the counter.</p>
                </div>
                <div className="bg-white border-l border-r border-gray-200 w-full p-8">
                    <p className="text-gray-500 uppercase tracking-widest">Pickup ID</p>
                    <p className="text-7xl font-mono font-bold text-green-700 my-4">{order.id}</p>
                </div>
                <div className="w-full text-left bg-white border border-gray-200 p-6 rounded-b-2xl mb-8 shadow-md">
                    <h4 className="font-bold mb-2 text-gray-800">Order Summary</h4>
                    <p className="text-gray-600">Total Amount: <span className="font-bold text-gray-900">₹{order.total.toFixed(2)}</span></p>
                    <p className="text-gray-600">Pickup Slot: <span className="font-bold text-gray-900">{order.pickupSlot}</span></p>
                    <p className="text-gray-600">Location: <span className="font-bold text-gray-900">{STORES.find(s => s.id === order.storeId)?.name}</span></p>
                </div>
                <button onClick={onGoHome} className="w-full py-4 text-lg font-bold bg-gray-700 text-white rounded-2xl shadow-md hover:bg-gray-800 transition">Go to Home</button>
            </div>
        </div>
    );
};

const PastOrdersScreen: React.FC<{ orders: Order[], onReorder: (order: Order) => void, onBack: () => void }> = ({ orders, onReorder, onBack }) => (
    <div className="p-6 max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-4 text-gray-600 hover:text-gray-900">&larr; Back</button>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Past Orders</h2>
        <div className="space-y-4">
            {orders.length > 0 ? orders.map(order => (
                <div key={order.id} className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
                    <div className="flex flex-wrap gap-4 justify-between items-start">
                        <div>
                            <p className="font-bold text-gray-800">Order {order.id}</p>
                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="font-semibold mt-1 text-gray-700">Total: ₹{order.total.toFixed(2)}</p>
                            <p className={`text-sm font-bold mt-1 ${order.status === 'completed' ? 'text-green-600' : 'text-yellow-500'}`}>{order.status.toUpperCase()}</p>
                        </div>
                        <button onClick={() => onReorder(order)} className="px-4 py-2 font-semibold text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Reorder</button>
                    </div>
                </div>
            )) : <p className="text-center text-gray-500 py-10">No past orders found.</p>}
        </div>
    </div>
);

const CallbackModal: React.FC<{onBack: () => void}> = ({onBack}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name && phone){
            console.log('Callback Requested:', { name, phone });
            setSubmitted(true);
            setTimeout(onBack, 2500);
        }
    }
    
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
                <button onClick={onBack} className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 text-2xl font-bold">&times;</button>
                {submitted ? (
                    <div className="text-center py-4">
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Request Received!</h3>
                        <p className="text-gray-600">We will call you back shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Request a Callback</h3>
                        <p className="text-gray-500 mb-4">Enter your details and we'll call you to place the order.</p>
                        <div className="space-y-4">
                            <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        <button type="submit" className="mt-6 w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition">Confirm Callback</button>
                    </form>
                )}
            </div>
        </div>
    );
};


export default VendorApp;