
import React, { useState, useMemo } from 'react';
import type { Product, CartItem } from '../types';

interface BrowseProductsScreenProps {
  products: Product[];
  cart: CartItem[];
  onUpdateCart: (productId: string, quantity: number) => void;
  onViewOrder: () => void;
  onOpenHelp: () => void;
  onBack: () => void;
}

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const QuantityControl: React.FC<{
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  inStock: boolean;
}> = ({ quantity, onQuantityChange, inStock }) => {
  return (
    <div className="flex items-center justify-center space-x-3 mt-3">
      <button
        onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
        disabled={!inStock}
        className="w-10 h-10 rounded-full bg-fresh-gray text-2xl font-bold text-fresh-green-dark disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300 transition-colors"
      >
        -
      </button>
      <span className="text-xl font-bold w-12 text-center">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        disabled={!inStock}
        className="w-10 h-10 rounded-full bg-fresh-gray text-2xl font-bold text-fresh-green-dark disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300 transition-colors"
      >
        +
      </button>
    </div>
  );
};

const FloatingCartButton: React.FC<{
  itemCount: number;
  totalPrice: number;
  onClick: () => void;
}> = ({ itemCount, totalPrice, onClick }) => {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent z-20">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onClick}
          className="w-full flex justify-between items-center bg-fresh-green-dark text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-2xl hover:bg-green-800 transition-all duration-300 transform hover:scale-105"
        >
          <span>{itemCount} item{itemCount > 1 ? 's' : ''} in order</span>
          <span>View Order - ₹{totalPrice.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

const BrowseProductsScreen: React.FC<BrowseProductsScreenProps> = ({ products, cart, onUpdateCart, onViewOrder, onOpenHelp, onBack }) => {
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
      <div className="sticky top-0 bg-fresh-gray-light z-10 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <button onClick={onBack} className="mb-2 text-sm text-fresh-green-dark font-semibold">&larr; Back to Vendor Type</button>
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-300 focus:ring-fresh-green focus:border-fresh-green"
              />
            </div>
            <button
              onClick={onOpenHelp}
              className="bg-fresh-green-light text-fresh-green-dark font-semibold py-3 px-5 rounded-xl whitespace-nowrap hover:bg-green-200 transition-colors"
            >
              Place Order on Call
            </button>
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
              <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${product.inStock ? 'bg-fresh-green-light text-fresh-green-dark' : 'bg-red-100 text-red-800'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <QuantityControl
              quantity={getQuantityInCart(product.id)}
              onQuantityChange={(newQuantity) => onUpdateCart(product.id, newQuantity)}
              inStock={product.inStock}
            />
          </div>
        ))}
      </div>

      <FloatingCartButton
        itemCount={totalItems}
        totalPrice={totalPrice}
        onClick={onViewOrder}
      />
    </div>
  );
};

export default BrowseProductsScreen;
