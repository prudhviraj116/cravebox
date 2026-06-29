import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Star, Clock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FoodItem, { type MenuItemType } from '@/components/FoodItem';
import FoodItemSkeleton from '@/components/FoodItemSkeleton';
import CartDrawer from '@/components/CartDrawer';
import SEO from '@/components/SEO';
import restaurantsData from '@/data/restaurants.json';
import menuData from '@/data/menu.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

const Menu = () => {
  const { id } = useParams<{ id: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { totalItems } = useCart();

  const restaurant = useMemo(
    () => restaurantsData.find((r) => r.id === Number(id)),
    [id]
  );
  const menuItems = useMemo<MenuItemType[]>(
    () => (menuData[id as keyof typeof menuData] as MenuItemType[]) || [],
    [id]
  );

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, [id]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(menuItems.map((i) => i.category)))],
    [menuItems]
  );

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [menuItems, selectedCategory, query]);

  const handleCategoryChange = useCallback((c: string) => setSelectedCategory(c), []);

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
    <div className="min-h-screen pb-24">
      <SEO
        title={`${restaurant.name} — ${restaurant.cuisine} Delivery | FoodieHub`}
        description={`Order ${restaurant.cuisine} food from ${restaurant.name} on FoodieHub. ${restaurant.deliveryTime} delivery, rated ${restaurant.rating}/5.`}
        path={`/menu/${restaurant.id}`}
        image={restaurant.image}
        jsonLd={restaurantJsonLd}
      />

      {/* Restaurant Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-72 md:h-80 overflow-hidden"
      >
        <motion.img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 max-w-7xl mx-auto w-full">
          <Link to="/restaurants">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full backdrop-blur-md bg-background/70 border border-border/40 hover:scale-105 smooth-transition"
              aria-label="Back to restaurants"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-3"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/90 text-primary-foreground">
              {restaurant.cuisine}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
              {restaurant.name}
            </h1>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <strong className="font-semibold">{restaurant.rating}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {restaurant.deliveryTime}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-4 mb-6 glass-strong rounded-none sm:rounded-2xl">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative md:max-w-xs flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dishes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 rounded-xl bg-background/60 border-border/40"
                aria-label="Search dishes"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    whileTap={{ scale: 0.94 }}
                    className={`relative whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium smooth-transition border ${
                      active
                        ? 'text-primary-foreground border-transparent'
                        : 'text-foreground/70 hover:text-foreground border-border/40 bg-background/60'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-cat"
                        className="absolute inset-0 rounded-full gradient-primary glow-primary"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <FoodItemSkeleton key={i} />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 text-muted-foreground"
          >
            <p className="text-lg">No dishes match your search.</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.04, 0.4),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <FoodItem item={item} restaurantId={restaurant.id} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="fixed bottom-6 right-6 z-30"
          >
            <motion.div
              key={totalItems}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Button
                size="lg"
                onClick={() => setIsCartOpen(true)}
                className="rounded-full gradient-accent px-6 py-6 glow-primary shadow-2xl"
                aria-label={`Open cart with ${totalItems} items`}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                View Cart
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white/25 text-sm font-bold backdrop-blur-sm">
                  {totalItems}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Menu;
