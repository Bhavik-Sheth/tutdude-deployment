
import React, { useState, useMemo } from 'react';
import { Order, StockItem, OrderItem, Basket } from '../types';
import { BASKETS } from '../constants';

interface BookOrderScreenProps {
  stock: StockItem[];
  onBookOrder: (order: Omit<Order, 'id' | 'status'>) => void;
  onBack: () => void;
}

const BookOrderScreen: React.FC<BookOrderScreenProps> = ({ stock, onBookOrder, onBack }) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [bookingTime, setBookingTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [selectedBasketId, setSelectedBasketId] = useState<string | null>(BASKETS.length > 0 ? BASKETS[0].id : null);

  const stockMap = useMemo(() => {
    const map = new Map<string, StockItem>();
    stock.forEach(item => map.set(item.id, item));
    return map;
  }, [stock]);

  const handleQuantityChange = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items: OrderItem[] = Object.entries(quantities)
      .filter(([, quantity]) => Number(quantity) > 0)
      .map(([itemId, quantity]) => ({
        itemId,
        name: stock.find(s => s.id === itemId)?.name || 'Unknown Item',
        quantity: Number(quantity),
      }));

    if (items.length === 0) {
      alert('Please add at least one item to the order.');
      return;
    }

    onBookOrder({ items, bookingTime });
  };
  
  const handleSelectBasket = (basketId: string) => {
    setSelectedBasketId(basketId);
  };

  const selectedBasket = useMemo(() => BASKETS.find(b => b.id === selectedBasketId), [selectedBasketId]);

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
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
                        <button type="button" onClick={() => handleQuantityChange(item.id, -1)} className="w-8 h-8 rounded-full bg-gray-600 text-gray-200 hover:bg-red-500 transition-colors">-</button>
                        <span className="w-8 text-center font-semibold text-lg">{currentQuantityInCart}</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end pt-4 border-t border-gray-700">
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">3. Select Time</label>
              <input
                id="time"
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-800 focus:ring-green-500 transition-colors disabled:opacity-50"
              disabled={!selectedBasket}
            >
              Book Order
            </button>
        </div>
      </form>
    </div>
  );
};

export default BookOrderScreen;