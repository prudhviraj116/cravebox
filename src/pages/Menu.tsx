import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import FoodItem from '@/components/FoodItem';
import CartDrawer from '@/components/CartDrawer';
import restaurantsData from '@/data/restaurants.json';
import menuData from '@/data/menu.json';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const Menu = () => {
  const { id } = useParams<{ id: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  const restaurant = restaurantsData.find((r) => r.id === Number(id));
  const menuItems = menuData[id as keyof typeof menuData] || [];

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Link to="/restaurants">
            <Button>Back to Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Restaurant Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <Link to="/restaurants">
            <Button variant="secondary" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {restaurant.name}
            </h1>
            <p className="text-lg opacity-90">{restaurant.cuisine}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <FoodItem item={item} restaurantId={restaurant.id} />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <Button
          size="lg"
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 rounded-full gradient-accent px-6 py-6 glow-primary shadow-2xl z-30 animate-scale-in"
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          View Cart ({totalItems})
        </Button>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Menu;
