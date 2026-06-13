import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import FoodItem from '@/components/FoodItem';
import CartDrawer from '@/components/CartDrawer';
import SEO from '@/components/SEO';
import restaurantsData from '@/data/restaurants.json';
import menuData from '@/data/menu.json';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Menu = () => {
  const { id } = useParams<{ id: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  const restaurant = restaurantsData.find((r) => r.id === Number(id));
  const menuItems = menuData[id as keyof typeof menuData] || [];

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(menuItems.map(item => item.category))];
    return cats;
  }, [menuItems]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return menuItems;
    return menuItems.filter(item => item.category === selectedCategory);
  }, [menuItems, selectedCategory]);

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

  const restaurantJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    image: restaurant.image,
    servesCuisine: restaurant.cuisine,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: restaurant.rating,
      reviewCount: 100,
    },
  };

  return (
    <div className="min-h-screen pb-8">
      <SEO
        title={`${restaurant.name} — ${restaurant.cuisine} Delivery | FoodieHub`}
        description={`Order ${restaurant.cuisine} food from ${restaurant.name} on FoodieHub. ${restaurant.deliveryTime} delivery, rated ${restaurant.rating}/5.`}
        path={`/menu/${restaurant.id}`}
        image={restaurant.image}
        jsonLd={restaurantJsonLd}
      />
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
            <Button variant="secondary" size="icon" className="rounded-full" aria-label="Back to restaurants">
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
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
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
