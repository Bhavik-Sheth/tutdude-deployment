import React, { useState, useCallback, createContext, useContext, ReactNode, useMemo } from 'react';

// Types
enum AppMode {
  Home,
  Vendor,
  Employee
}

enum Screen {
  Splash,
  SelectStore,
  SelectVendorType,
  BrowseProducts,
  PickupTime,
  OrderConfirmation,
  PastOrders
}

enum Page {
  Login,
  Home,
  BookOrder,
  BookingSuccess,
  CompleteOrder,
  AddStock
}

interface Store {
  id: string;
  name: string;
  area: string;
  hours: string;
  isOpen: boolean;
}

interface VendorType {
  id: string;
  name: string;
  icon: ReactNode;
}

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  pickupTime: string;
  store: Store;
  date: string;
  status?: 'pending' | 'completed';
}

interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
}

interface EmployeeOrder {
  id: string;
  items: OrderItem[];
  bookingTime: string;
  status: 'pending' | 'completed';
}

interface StockItem {
  id: string;
  name: string;
  count: number;
}

interface Basket {
  id: string;
  name: string;
  itemIds: string[];
}

// Icons
const PaniPuriIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
    <path d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    <path d="M12 9.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" />
  </svg>
);

const ChaatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 11.01L3 11v2h18zM3 16h18v2H3zM21 6H3v2.01L21 8z" />
  </svg>
);

const PavBhajiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 15.5v2h20v-2H2zm0-4v2h20v-2H2zm0-4v2h20v-2H2z" clipRule="evenodd" fillRule="evenodd" />
    <path d="M19.33 3H4.67C3.75 3 3 3.75 3 4.67v14.67C3 20.25 3.75 21 4.67 21h14.67c.92 0 1.67-.75 1.67-1.67V4.67C21 3.75 20.25 3 19.33 3zM19 19H5V5h14v14z" />
  </svg>
);

// Constants
const STORES: Store[] = [
  { id: 's1', name: 'FreshStock - Sector 45', area: 'Mumbai, 400016', hours: '6 AM - 8 PM', isOpen: true },
  { id: 's2', name: 'FreshStock - Dadar', area: 'Mumbai, 400028', hours: '7 AM - 9 PM', isOpen: true },
  { id: 's3', name: 'FreshStock - Thane West', area: 'Thane, 400601', hours: '6 AM - 8 PM', isOpen: false },
  { id: 's4', name: 'FreshStock - Navi Mumbai', area: 'Navi Mumbai, 400703', hours: '8 AM - 10 PM', isOpen: true },
];

const VENDOR_TYPES: VendorType[] = [
  { id: 'vt1', name: 'Pani Puri', icon: <PaniPuriIcon /> },
  { id: 'vt2', name: 'Chaat', icon: <ChaatIcon /> },
  { id: 'vt3', name: 'Pav Bhaji', icon: <PavBhajiIcon /> },
];

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Tomato', price: 40, unit: 'kg', image: 'https://picsum.photos/id/1080/200/200', inStock: true },
  { id: 'p2', name: 'Onion', price: 30, unit: 'kg', image: 'https://picsum.photos/id/292/200/200', inStock: true },
  { id: 'p3', name: 'Potato', price: 25, unit: 'kg', image: 'https://picsum.photos/id/1078/200/200', inStock: true },
  { id: 'p4', name: 'Coriander', price: 10, unit: 'bunch', image: 'https://picsum.photos/id/106/200/200', inStock: false },
  { id: 'p5', name: 'Green Chillies', price: 50, unit: 'kg', image: 'https://picsum.photos/id/425/200/200', inStock: true },
  { id: 'p6', name: 'Lemon', price: 5, unit: 'piece', image: 'https://picsum.photos/id/211/200/200', inStock: true },
];

const BASKETS: Basket[] = [
  {
    id: 'bask-1',
    name: 'Pav Bhaji Basket',
    itemIds: ['p1', 'p2', 'p3', 'p5', 'p6']
  },
  {
    id: 'bask-2',
    name: 'Chaat Basket',
    itemIds: ['p1', 'p2', 'p3', 'p4', 'p6']
  },
  {
    id: 'bask-3',
    name: 'Basic Vegetables',
    itemIds: ['p1', 'p2', 'p3', 'p5']
  }
];

const TIME_SLOTS = [
  { time: '8 AM – 10 AM', available: true },
  { time: '10 AM – 12 PM', available: true },
  { time: '12 PM - 2 PM', available: true },
  { time: '2 PM – 4 PM', available: false },
  { time: '4 PM – 6 PM', available: true },
  { time: '6 PM – 8 PM', available: true },
];

// Shared State Context
interface SharedState {
  products: Product[];
  stock: StockItem[];
  vendorOrders: Order[];
  employeeOrders: EmployeeOrder[];
  updateStock: (itemId: string, newCount: number) => void;
  addVendorOrder: (order: Order) => void;
  addEmployeeOrder: (order: EmployeeOrder) => void;
  completeOrder: (orderId: string) => void;
  syncProductStock: () => void;
}

const SharedStateContext = createContext<SharedState | undefined>(undefined);

const INITIAL_STOCK: StockItem[] = [
  { id: 'p1', name: 'Tomato', count: 100 },
  { id: 'p2', name: 'Onion', count: 100 },
  { id: 'p3', name: 'Potato', count: 80 },
  { id: 'p4', name: 'Coriander', count: 0 },
  { id: 'p5', name: 'Green Chillies', count: 30 },
  { id: 'p6', name: 'Lemon', count: 40 },
];

const SharedStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stock, setStock] = useState<StockItem[]>(INITIAL_STOCK);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [vendorOrders, setVendorOrders] = useState<Order[]>([]);
  const [employeeOrders, setEmployeeOrders] = useState<EmployeeOrder[]>([]);

  const updateStock = useCallback((itemId: string, newCount: number) => {
    setStock(prevStock =>
      prevStock.map(item =>
        item.id === itemId ? { ...item, count: Math.max(0, newCount) } : item
      )
    );
  }, []);

  const syncProductStock = useCallback(() => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        const stockItem = stock.find(s => s.id === product.id);
        return stockItem
          ? { ...product, inStock: stockItem.count > 0 }
          : product;
      })
    );
  }, [stock]);

  const addVendorOrder = useCallback((order: Order) => {
    setVendorOrders(prev => [order, ...prev]);
    
    // Convert vendor order to employee order format
    const employeeOrder: EmployeeOrder = {
      id: order.id,
      items: order.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          itemId: item.productId,
          name: product?.name || 'Unknown Item',
          quantity: item.quantity
        };
      }),
      bookingTime: order.pickupTime,
      status: 'pending'
    };
    
    setEmployeeOrders(prev => [employeeOrder, ...prev]);
  }, [products]);

  const addEmployeeOrder = useCallback((order: EmployeeOrder) => {
    setEmployeeOrders(prev => [order, ...prev]);
  }, []);

  const completeOrder = useCallback((orderId: string) => {
    const orderToComplete = employeeOrders.find(order => order.id === orderId);

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
    setEmployeeOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'completed' } : order
      )
    );

    // Also update vendor orders if it exists
    setVendorOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'completed' } : order
      )
    );
  }, [employeeOrders]);

  // Sync product stock whenever stock changes
  React.useEffect(() => {
    syncProductStock();
  }, [stock, syncProductStock]);

  const value: SharedState = {
    products,
    stock,
    vendorOrders,
    employeeOrders,
    updateStock,
    addVendorOrder,
    addEmployeeOrder,
    completeOrder,
    syncProductStock
  };

  return (
    <SharedStateContext.Provider value={value}>
      {children}
    </SharedStateContext.Provider>
  );
};

const useSharedState = (): SharedState => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};

// Home Screen Component
const HomeScreen: React.FC<{ onModeChange: (mode: AppMode) => void }> = ({ onModeChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-gray-100 flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-green-700 mb-4">FreshStock</h1>
          <p className="text-xl text-gray-700">
            Complete Supply Chain Management System
          </p>
          <p className="text-lg text-gray-600 mt-2">
            ताज़ा सामग्री, आसान प्रबंधन
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={() => onModeChange(AppMode.Vendor)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-8 rounded-2xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6a2 2 0 002 2h4a2 2 0 002-2v-6M8 11h8" />
              </svg>
              <span>Food Vendor Portal</span>
            </div>
            <p className="text-sm mt-2 opacity-90">Order fresh ingredients for your business</p>
          </button>

          <button
            onClick={() => onModeChange(AppMode.Employee)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-8 rounded-2xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Outlet Employee Portal</span>
            </div>
            <p className="text-sm mt-2 opacity-90">Manage orders and inventory</p>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Seamlessly integrated system for vendors and employees
          </p>
        </div>
      </div>
    </div>
  );
};

// Vendor Components
const VendorSplashScreen: React.FC<{
  onStart: () => void;
  onViewOrders: () => void;
  onBackToHome: () => void;
  recentOrder: Order | null;
}> = ({ onStart, onViewOrders, onBackToHome, recentOrder }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-8 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <button 
          onClick={onBackToHome}
          className="mb-4 text-sm text-green-600 font-semibold self-start hover:text-green-700 transition-colors"
        >
          ← Back to Main Menu
        </button>

        {recentOrder && (
          <div className="mb-8 p-6 bg-green-100 border-2 border-dashed border-green-600 rounded-2xl text-left">
            <h3 className="text-xl font-bold text-green-700 mb-2">Your Order is Confirmed!</h3>
            <p className="text-gray-700"><span className="font-semibold">Pickup ID:</span> <span className="font-bold text-xl">{recentOrder.id}</span></p>
            <p className="text-gray-700"><span className="font-semibold">Store:</span> {recentOrder.store.name}</p>
            <p className="text-gray-700"><span className="font-semibold">Pickup Slot:</span> {recentOrder.pickupTime}</p>
          </div>
        )}

        <h1 className="text-5xl font-bold text-green-700">FreshStock</h1>
        <p className="text-lg text-gray-600 mt-2 mb-8">
          Fresh Ingredients, Easy Orders / ताज़ा सामग्री, आसान ऑर्डर
        </p>
        <div className="space-y-4">
          <button
            onClick={onStart}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition-transform transform hover:scale-105"
          >
            Start New Order
          </button>
          <button
            onClick={onViewOrders}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl text-xl transition-transform transform hover:scale-105"
          >
            My Past Orders
          </button>
        </div>
      </div>
    </div>
  );
};

const SelectStoreScreen: React.FC<{
  stores: Store[];
  onSelectStore: (store: Store) => void;
  onBack: () => void;
}> = ({ stores, onSelectStore, onBack }) => {
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto min-h-screen">
      <button onClick={onBack} className="mb-4 text-green-600 font-semibold">← Back to Vendor Home</button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Select a Store</h2>
      <div className="space-y-4">
        {stores.map(store => (
          <div
            key={store.id}
            onClick={() => store.isOpen && onSelectStore(store)}
            className={`bg-white p-6 rounded-2xl shadow-md transition-all duration-300 ${store.isOpen ? 'cursor-pointer hover:shadow-lg hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{store.name}</h3>
                <p className="text-gray-600">{store.area}</p>
                <p className="text-sm text-gray-500 mt-1">{store.hours}</p>
              </div>
              <div className="text-right">
                {store.isOpen ? (
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-600 font-semibold">Open Now</span>
                  </div>
                ) : (
                  <span className="text-red-500 font-semibold">Closed</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SelectVendorTypeScreen: React.FC<{
  vendorTypes: VendorType[];
  onSelectVendorType: (vendorType: VendorType) => void;
  onBack: () => void;
}> = ({ vendorTypes, onSelectVendorType, onBack }) => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen">
      <button onClick={onBack} className="mb-4 text-green-600 font-semibold">← Back to Store Selection</button>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What do you sell?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {vendorTypes.map(type => (
          <div
            key={type.id}
            onClick={() => onSelectVendorType(type)}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            {type.icon}
            <p className="mt-4 text-lg font-semibold text-gray-700 text-center">{type.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const BrowseProductsScreen: React.FC<{
  products: Product[];
  cart: CartItem[];
  onUpdateCart: (productId: string, quantity: number) => void;
  onViewOrder: () => void;
  onBack: () => void;
}> = ({ products, cart, onUpdateCart, onViewOrder, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() =>
    products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [products, searchTerm]
  );

  const { totalItems, totalPrice } = useMemo(() => {
    return cart.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        acc.totalItems += item.quantity;
        acc.totalPrice += product.price * item.quantity;
      }
      return acc;
    }, { totalItems: 0, totalPrice: 0 });
  }, [cart, products]);

  const getQuantityInCart = (productId: string) => {
    return cart.find(item => item.productId === productId)?.quantity || 0;
  };

  return (
    <div className="pb-28">
      <div className="sticky top-0 bg-green-50 z-10 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <button onClick={onBack} className="mb-2 text-sm text-green-600 font-semibold">← Back to Vendor Type</button>
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between transition-transform duration-300 hover:shadow-lg">
            <div>
              <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">₹{product.price}/{product.unit}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-800'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="flex items-center justify-center space-x-3 mt-3">
              <button
                onClick={() => onUpdateCart(product.id, Math.max(0, getQuantityInCart(product.id) - 1))}
                disabled={!product.inStock}
                className="w-10 h-10 rounded-full bg-gray-200 text-2xl font-bold text-green-700 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <span className="text-xl font-bold w-12 text-center">{getQuantityInCart(product.id)}</span>
              <button
                onClick={() => onUpdateCart(product.id, getQuantityInCart(product.id) + 1)}
                disabled={!product.inStock}
                className="w-10 h-10 rounded-full bg-gray-200 text-2xl font-bold text-green-700 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent z-20">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={onViewOrder}
              className="w-full flex justify-between items-center bg-green-700 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-2xl hover:bg-green-800 transition-all duration-300 transform hover:scale-105"
            >
              <span>{totalItems} item{totalItems > 1 ? 's' : ''} in order</span>
              <span>View Order - ₹{totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PickupTimeScreen: React.FC<{
  onConfirm: (timeSlot: string) => void;
  onBack: () => void;
}> = ({ onConfirm, onBack }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-md mx-auto min-h-screen flex flex-col">
      <button onClick={onBack} className="mb-4 text-green-600 font-semibold self-start">← Back to Order</button>
      <div className="bg-white p-8 rounded-2xl shadow-lg flex-grow flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Choose Pickup Time</h2>
        <p className="text-center text-gray-500 mb-8">Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>

        <div className="space-y-4 flex-grow">
          {TIME_SLOTS.map(({ time, available }) => (
            <button
              key={time}
              onClick={() => available && setSelectedSlot(time)}
              disabled={!available}
              className={`w-full text-left p-4 rounded-xl text-lg font-semibold transition-all duration-200
                ${!available ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through' : ''}
                ${available && selectedSlot === time ? 'bg-green-600 text-white ring-4 ring-green-200' : ''}
                ${available && selectedSlot !== time ? 'bg-green-100 text-gray-700 hover:bg-green-200' : ''}
              `}
            >
              {time}
            </button>
          ))}
        </div>

        <button
          onClick={() => selectedSlot && onConfirm(selectedSlot)}
          disabled={!selectedSlot}
          className="w-full bg-green-700 text-white font-bold py-4 px-6 rounded-xl text-xl mt-8 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-800"
        >
          Confirm Slot
        </button>
      </div>
    </div>
  );
};

const OrderConfirmationScreen: React.FC<{
  order: Order;
  products: Product[];
  onGoHome: () => void;
}> = ({ order, products, onGoHome }) => {
  const findProduct = (productId: string) => products.find(p => p.id === productId);

  return (
    <div className="p-4 md:p-8 max-w-md mx-auto min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed!</h2>

        <div className="bg-green-50 p-6 rounded-xl my-6">
          <p className="text-gray-600 text-lg">Your Pickup ID</p>
          <p className="text-5xl font-extrabold text-green-700 tracking-widest my-2">{order.id}</p>
          <p className="text-gray-500">Show this ID at the counter</p>
        </div>

        <div className="text-left border-t border-b border-gray-200 py-4 my-6">
          <h4 className="font-bold text-lg mb-2">Order Summary</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {order.items.map(item => {
              const product = findProduct(item.productId);
              return product ? (
                <div key={item.productId} className="flex justify-between text-gray-700">
                  <span>{product.name}</span>
                  <span>{item.quantity} {product.unit}</span>
                </div>
              ) : null;
            })}
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-gray-200">
            <span>Total Amount</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-left bg-gray-50 p-4 rounded-xl">
          <p><span className="font-semibold">Pickup Slot:</span> {order.pickupTime}</p>
          <p><span className="font-semibold">Location:</span> {order.store.name}</p>
        </div>

        <button
          onClick={onGoHome}
          className="w-full bg-green-700 text-white font-bold py-4 px-6 rounded-xl text-xl mt-8 transition-colors hover:bg-green-800"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

const PastOrdersScreen: React.FC<{
  orders: Order[];
  products: Product[];
  onReorder: (order: Order) => void;
  onBack: () => void;
}> = ({ orders, products, onReorder, onBack }) => {
  const getItemSummary = (order: Order): string => {
    return order.items
      .map(item => products.find(p => p.id === item.productId)?.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(', ') + (order.items.length > 3 ? '...' : '');
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto min-h-screen">
      <button onClick={onBack} className="mb-4 text-green-600 font-semibold">← Back to Vendor Home</button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Past Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-2xl shadow-md">
          <p className="text-gray-500 text-lg">You have no past orders.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg text-gray-800">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                  <p className="mt-2 text-gray-700">Items: {getItemSummary(order)}</p>
                  <p className="text-sm text-gray-500">Status: <span className={`font-semibold ${order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status || 'pending'}</span></p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">₹{order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => onReorder(order)}
                  className="bg-green-100 text-green-700 font-semibold py-2 px-6 rounded-xl hover:bg-green-200 transition-colors"
                >
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Vendor App Component
const VendorApp: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { products, addVendorOrder, vendorOrders } = useSharedState();
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Splash);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedVendorType, setSelectedVendorType] = useState<VendorType | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const resetToHome = useCallback(() => {
    setCurrentScreen(Screen.Splash);
    setSelectedStore(null);
    setSelectedVendorType(null);
    setCart([]);
    setConfirmedOrder(null);
  }, []);

  const handleStartShopping = () => {
    setConfirmedOrder(null);
    setCurrentScreen(Screen.SelectStore);
  };
  
  const handleViewPastOrders = () => {
    setConfirmedOrder(null);
    setCurrentScreen(Screen.PastOrders);
  };

  const handleGoHomeFromConfirmation = () => {
    setCurrentScreen(Screen.Splash);
    setCart([]);
  };

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    setCurrentScreen(Screen.SelectVendorType);
  };

  const handleSelectVendorType = (vendorType: VendorType) => {
    setSelectedVendorType(vendorType);
    setCurrentScreen(Screen.BrowseProducts);
  };

  const handleUpdateCart = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      if (quantity <= 0) {
        return prevCart.filter(item => item.productId !== productId);
      }
      if (existingItem) {
        return prevCart.map(item => item.productId === productId ? { ...item, quantity } : item);
      }
      return [...prevCart, { productId, quantity }];
    });
  };
  
  const handleConfirmPickupTime = (timeSlot: string) => {
    if (!selectedStore || cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const newOrder: Order = {
      id: `A${Math.floor(100 + Math.random() * 900)}`,
      items: cart,
      total,
      pickupTime: timeSlot,
      store: selectedStore,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'}),
      status: 'pending',
    };

    setConfirmedOrder(newOrder);
    addVendorOrder(newOrder);
    setCurrentScreen(Screen.OrderConfirmation);
  };
  
  const handleReorder = (order: Order) => {
    const storeForReorder = STORES.find(s => s.id === order.store.id)
    if(storeForReorder && storeForReorder.isOpen) {
      setConfirmedOrder(null);
      setSelectedStore(storeForReorder);
      setCart(order.items);
      setCurrentScreen(Screen.BrowseProducts);
    } else {
      alert("The store for this order is currently closed or unavailable. Please start a new order.");
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Splash:
        return <VendorSplashScreen onStart={handleStartShopping} onViewOrders={handleViewPastOrders} onBackToHome={onBackToHome} recentOrder={confirmedOrder} />;
      case Screen.SelectStore:
        return <SelectStoreScreen stores={STORES} onSelectStore={handleSelectStore} onBack={resetToHome} />;
      case Screen.SelectVendorType:
        return <SelectVendorTypeScreen vendorTypes={VENDOR_TYPES} onSelectVendorType={handleSelectVendorType} onBack={() => setCurrentScreen(Screen.SelectStore)} />;
      case Screen.BrowseProducts:
        return <BrowseProductsScreen
          products={products}
          cart={cart}
          onUpdateCart={handleUpdateCart}
          onViewOrder={() => setCurrentScreen(Screen.PickupTime)}
          onBack={() => setCurrentScreen(Screen.SelectVendorType)}
        />;
      case Screen.PickupTime:
        return <PickupTimeScreen onConfirm={handleConfirmPickupTime} onBack={() => setCurrentScreen(Screen.BrowseProducts)} />;
      case Screen.OrderConfirmation:
        return confirmedOrder ? <OrderConfirmationScreen order={confirmedOrder} products={products} onGoHome={handleGoHomeFromConfirmation} /> : <VendorSplashScreen onStart={handleStartShopping} onViewOrders={handleViewPastOrders} onBackToHome={onBackToHome} recentOrder={null} />;
      case Screen.PastOrders:
        return <PastOrdersScreen orders={vendorOrders} products={products} onReorder={handleReorder} onBack={resetToHome} />;
      default:
        return <VendorSplashScreen onStart={handleStartShopping} onViewOrders={handleViewPastOrders} onBackToHome={onBackToHome} recentOrder={null} />;
    }
  };

  return (
    <div className="antialiased text-gray-800">
      {renderScreen()}
    </div>
  );
};

// Employee Components
const EmployeeLoginScreen: React.FC<{
  onLogin: () => void;
  onBackToHome: () => void;
}> = ({ onLogin, onBackToHome }) => {
  const [outletId, setOutletId] = useState('');
  const [passkey, setPasskey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (outletId && passkey) {
      onLogin();
    } else {
      alert('Please enter both Outlet ID and Passkey.');
    }
  };

  const handleDemoLogin = () => {
    onLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-800">
        <button 
          onClick={onBackToHome}
          className="mb-4 text-sm text-green-400 font-semibold hover:text-green-300 transition-colors"
        >
          ← Back to Main Menu
        </button>
        
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">Outlet Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="outletId" className="block text-sm font-medium text-gray-300">
              Enter Outlet ID
            </label>
            <input
              id="outletId"
              type="text"
              value={outletId}
              onChange={(e) => setOutletId(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., OUTLET-123"
            />
          </div>
          <div>
            <label htmlFor="passkey" className="block text-sm font-medium text-gray-300">
              Enter Passkey
            </label>
            <input
              id="passkey"
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center mb-4">Demo Access</p>
          <button
            onClick={handleDemoLogin}
            className="w-full flex justify-center py-3 px-4 border border-gray-600 rounded-lg shadow-sm text-lg font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
          >
            Demo Login (Any ID/Password)
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployeeHomeScreen: React.FC<{
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  onBackToHome: () => void;
}> = ({ onNavigate, onLogout, onBackToHome }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBackToHome}
            className="text-sm text-green-400 font-semibold hover:text-green-300 transition-colors"
          >
            ← Back to Main Menu
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-100">Employee Dashboard</h1>
        </div>
        <button onClick={onLogout} className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors">Logout</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <button
          onClick={() => onNavigate(Page.BookOrder)}
          className="w-full text-center p-8 bg-gray-800 border border-green-800 rounded-lg shadow-sm hover:shadow-lg hover:bg-green-900/50 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 flex flex-col items-center justify-center h-48"
        >
          <span className="text-2xl font-semibold text-gray-100">Book Order For a Customer</span>
        </button>
        <button
          onClick={() => onNavigate(Page.CompleteOrder)}
          className="w-full text-center p-8 bg-gray-800 border border-green-800 rounded-lg shadow-sm hover:shadow-lg hover:bg-green-900/50 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 flex flex-col items-center justify-center h-48"
        >
          <span className="text-2xl font-semibold text-gray-100">Complete Order</span>
        </button>
        <button
          onClick={() => onNavigate(Page.AddStock)}
          className="w-full text-center p-8 bg-gray-800 border border-green-800 rounded-lg shadow-sm hover:shadow-lg hover:bg-green-900/50 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 flex flex-col items-center justify-center h-48"
        >
          <span className="text-2xl font-semibold text-gray-100">Add Stock</span>
        </button>
      </div>
    </div>
  );
};

const BookOrderScreen: React.FC<{
  stock: StockItem[];
  onBookOrder: (order: Omit<EmployeeOrder, 'id' | 'status'>) => void;
  onBack: () => void;
}> = ({ stock, onBookOrder, onBack }) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedBasketId, setSelectedBasketId] = useState<string | null>(BASKETS.length > 0 ? BASKETS[0].id : null);

  const stockMap = useMemo(() => {
    const map = new Map<string, StockItem>();
    stock.forEach(item => map.set(item.id, item));
    return map;
  }, [stock]);

  const handleQuantityChange = (itemId: string, change: number) => {
    const currentQuantity = quantities[itemId] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Current quantities:', quantities);
    console.log('Selected time slot:', selectedTimeSlot);
    
    // Get items with quantities > 0
    const items: OrderItem[] = Object.entries(quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        const stockItem = stock.find(s => s.id === itemId);
        return {
          itemId,
          name: stockItem?.name || 'Unknown Item',
          quantity: quantity,
        };
      });

    console.log('Items to order:', items);

    // Validation
    if (items.length === 0) {
      console.log('No items selected');
      alert('Please add at least one item to the order.');
      return;
    }

    if (!selectedTimeSlot) {
      console.log('No time slot selected');
      alert('Please select a time slot.');
      return;
    }

    // Check if all items are available in stock
    const invalidItems = items.filter(item => {
      const stockItem = stockMap.get(item.itemId);
      return !stockItem || stockItem.count < item.quantity;
    });

    if (invalidItems.length > 0) {
      console.log('Insufficient stock for items:', invalidItems);
      alert(`Insufficient stock for: ${invalidItems.map(item => item.name).join(', ')}`);
      return;
    }

    console.log('All validations passed, calling onBookOrder');
    const orderData = { items, bookingTime: selectedTimeSlot };
    console.log('Order data:', orderData);
    
    try {
      onBookOrder(orderData);
      console.log('onBookOrder called successfully');
    } catch (error) {
      console.error('Error calling onBookOrder:', error);
      alert('Error booking order. Please try again.');
    }
  };
  
  const handleSelectBasket = (basketId: string) => {
    setSelectedBasketId(basketId);
    // Reset quantities when changing basket
    setQuantities({});
  };

  const selectedBasket = useMemo(() => BASKETS.find(b => b.id === selectedBasketId), [selectedBasketId]);

  // Calculate total items selected
  const totalItemsSelected = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-green-800">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="mr-6 text-gray-300 hover:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100">Book New Order</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-green-400 mb-4">1. Select a Basket</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BASKETS.map(basket => (
              <button
                key={basket.id}
                type="button"
                onClick={() => handleSelectBasket(basket.id)}
                className={`p-4 rounded-lg font-semibold text-center transition-all duration-200 border-2 ${
                  selectedBasketId === basket.id
                    ? 'bg-green-600 border-green-500 text-white shadow-lg'
                    : 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500'
                }`}
              >
                {basket.name}
              </button>
            ))}
          </div>
        </div>

        {selectedBasket && (
          <div>
            <h2 className="text-xl font-semibold text-green-400 mb-4">2. Add Items from <span className="text-white">{selectedBasket.name}</span></h2>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {selectedBasket.itemIds.map(itemId => {
                const item = stockMap.get(itemId);
                if (!item) return null;

                const currentQuantityInCart = quantities[item.id] || 0;
                const isOutOfStock = item.count === 0;
                const canAddMore = !isOutOfStock && currentQuantityInCart < item.count;

                return (
                  <div key={item.id} className={`flex justify-between items-center p-3 rounded-lg transition-colors ${isOutOfStock ? 'bg-gray-900/50' : 'bg-gray-700'}`}>
                    <div className="flex flex-col">
                      <span className={`font-medium ${isOutOfStock ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{item.name}</span>
                      <span className="text-xs text-gray-400">
                        {isOutOfStock ? 'Out of stock' : `${item.count} in stock`}
                      </span>
                    </div>
                    
                    {!isOutOfStock && (
                      <div className="flex items-center gap-3">
                        <button 
                          type="button" 
                          onClick={() => handleQuantityChange(item.id, -1)} 
                          className="w-8 h-8 rounded-full bg-gray-600 text-gray-200 hover:bg-red-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                          disabled={currentQuantityInCart === 0}
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold text-lg text-white">{currentQuantityInCart}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          disabled={!canAddMore}
                          className="w-8 h-8 rounded-full bg-gray-600 text-gray-200 hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-green-400 mb-4">3. Select Time Slot</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TIME_SLOTS.map(({ time, available }) => (
              <button
                key={time}
                type="button"
                onClick={() => available && setSelectedTimeSlot(time)}
                disabled={!available}
                className={`p-4 rounded-lg font-semibold text-center transition-all duration-200 border-2 ${
                  !available ? 'bg-gray-900/50 border-gray-700 text-gray-500 cursor-not-allowed line-through' : 
                  selectedTimeSlot === time ? 'bg-green-600 border-green-500 text-white shadow-lg' :
                  'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <div className="mb-4 text-center">
            <p className="text-gray-300">
              {totalItemsSelected > 0 ? (
                <>Selected: <span className="text-green-400 font-semibold">{totalItemsSelected} items</span></>
              ) : (
                <span className="text-gray-500">No items selected</span>
              )}
            </p>
            {selectedTimeSlot && (
              <p className="text-gray-300 mt-1">
                Time Slot: <span className="text-green-400 font-semibold">{selectedTimeSlot}</span>
              </p>
            )}
          </div>
          <button
            type="submit"
            onClick={(e) => {
              console.log('Button clicked');
              handleSubmit(e);
            }}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white transition-colors ${
              !selectedBasket || !selectedTimeSlot || totalItemsSelected === 0
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-800 focus:ring-green-500'
            }`}
            disabled={!selectedBasket || !selectedTimeSlot || totalItemsSelected === 0}
          >
            {totalItemsSelected === 0 ? 'Add Items to Book Order' : 
             !selectedTimeSlot ? 'Select Time Slot' : 
             'Book Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

const CompleteOrderScreen: React.FC<{
  orders: EmployeeOrder[];
  onCompleteOrder: (orderId: string) => void;
  onBack: () => void;
}> = ({ orders, onCompleteOrder, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const pendingOrders = useMemo(() => {
    return orders
      .filter(order => order.status === 'pending')
      .filter(order => order.id.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [orders, searchTerm]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="mr-6 text-gray-300 hover:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100">Complete Orders</h1>
      </div>
      <div className="mb-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-2">
        {pendingOrders.length > 0 ? (
          pendingOrders.map(order => (
            <div key={order.id} className="bg-gray-800 p-5 rounded-lg shadow-lg border border-green-900/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-green-400 truncate">{order.id}</h3>
                <p className="text-sm text-gray-400 mb-3">Booked at: {order.bookingTime}</p>
                <ul className="text-sm list-disc list-inside text-gray-300 space-y-1">
                  {order.items.map(item => (
                    <li key={item.itemId}>{item.name} (x{item.quantity})</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onCompleteOrder(order.id)}
                className="bg-green-600 text-white text-sm w-full mt-4 font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark as Completed
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-16 md:col-span-2 xl:col-span-3 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-400">No Pending Orders</h3>
            <p className="text-gray-500 mt-2">{searchTerm ? 'No orders match your search.' : 'All orders are completed!'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AddStockScreen: React.FC<{
  stock: StockItem[];
  onUpdateStock: (itemId: string, newCount: number) => void;
  onBack: () => void;
}> = ({ stock, onUpdateStock, onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-green-800">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-6 text-gray-300 hover:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100">Manage Stock</h1>
      </div>
      <p className="text-sm text-gray-400 mb-6">Adjust stock levels for each item. Changes are saved automatically.</p>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {stock.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
            <span className="font-medium text-lg text-gray-200">{item.name}</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onUpdateStock(item.id, item.count - 1)}
                className="w-10 h-10 rounded-full bg-gray-600 text-gray-200 text-2xl hover:bg-red-500 transition-colors"
              >
                -
              </button>
              <span className="w-16 text-center font-semibold text-2xl text-white">{item.count}</span>
              <button
                onClick={() => onUpdateStock(item.id, item.count + 1)}
                className="w-10 h-10 rounded-full bg-gray-600 text-gray-200 text-2xl hover:bg-green-500 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6">
        <button
          onClick={onBack}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-800 focus:ring-green-500 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

// Employee App Component
const EmployeeApp: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { stock, employeeOrders, updateStock, addEmployeeOrder, completeOrder } = useSharedState();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
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

  const handleBookOrder = useCallback((newOrder: Omit<EmployeeOrder, 'id' | 'status'>) => {
    console.log('handleBookOrder called with:', newOrder);
    const orderId = `ORD${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const orderWithId: EmployeeOrder = {
      ...newOrder,
      id: orderId,
      status: 'pending',
    };
    console.log('Adding employee order:', orderWithId);
    addEmployeeOrder(orderWithId);
    setLastOrderId(orderId);
    setCurrentPage(Page.BookingSuccess);
  }, [addEmployeeOrder]);

  const renderPage = () => {
    if (!isLoggedIn) {
      return <EmployeeLoginScreen onLogin={handleLogin} onBackToHome={onBackToHome} />;
    }

    switch (currentPage) {
      case Page.Home:
        return <EmployeeHomeScreen onNavigate={handleNavigate} onLogout={handleLogout} onBackToHome={onBackToHome} />;
      case Page.BookOrder:
        return <BookOrderScreen stock={stock} onBookOrder={handleBookOrder} onBack={() => handleNavigate(Page.Home)} />;
      case Page.BookingSuccess:
        return (
          <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
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
          </div>
        );
      case Page.CompleteOrder:
        return <CompleteOrderScreen orders={employeeOrders} onCompleteOrder={completeOrder} onBack={() => handleNavigate(Page.Home)} />;
      case Page.AddStock:
        return <AddStockScreen stock={stock} onUpdateStock={updateStock} onBack={() => handleNavigate(Page.Home)} />;
      default:
        return <EmployeeHomeScreen onNavigate={handleNavigate} onLogout={handleLogout} onBackToHome={onBackToHome} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      {renderPage()}
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.Home);

  const handleModeChange = useCallback((mode: AppMode) => {
    setCurrentMode(mode);
  }, []);

  const renderCurrentMode = () => {
    switch (currentMode) {
      case AppMode.Home:
        return <HomeScreen onModeChange={handleModeChange} />;
      case AppMode.Vendor:
        return <VendorApp onBackToHome={() => handleModeChange(AppMode.Home)} />;
      case AppMode.Employee:
        return <EmployeeApp onBackToHome={() => handleModeChange(AppMode.Home)} />;
      default:
        return <HomeScreen onModeChange={handleModeChange} />;
    }
  };

  return (
    <SharedStateProvider>
      <div className="antialiased text-gray-800">
        {renderCurrentMode()}
      </div>
    </SharedStateProvider>
  );
};

export default App;