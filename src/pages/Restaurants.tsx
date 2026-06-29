import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import RestaurantCard, { type Restaurant } from '@/components/RestaurantCard';
import RestaurantCardSkeleton from '@/components/RestaurantCardSkeleton';
import restaurantsData from '@/data/restaurants.json';
import { Input } from '@/components/ui/input';
import SEO from '@/components/SEO';

const SITE_URL = 'https://cravebox.lovable.app';

const allTags = ['All', 'Burgers', 'Pizza', 'Sushi', 'Mexican', 'Indian', 'Asian'] as const;
type Tag = (typeof allTags)[number];

const Restaurants = () => {
  const [selectedTag, setSelectedTag] = useState<Tag>('All');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(t);
  }, []);

  const filteredRestaurants = useMemo<Restaurant[]>(() => {
    const q = query.trim().toLowerCase();
    return (restaurantsData as Restaurant[]).filter((r) => {
      const matchTag = selectedTag === 'All' || r.tags.includes(selectedTag);
      const matchQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchTag && matchQuery;
    });
  }, [selectedTag, query]);

  const handleTagSelect = useCallback((tag: Tag) => setSelectedTag(tag), []);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Local Restaurants on FoodieHub',
    itemListElement: (restaurantsData as Restaurant[]).map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/menu/${r.id}`,
      name: r.name,
    })),
  };

  return (
    <div className="min-h-screen pb-16">
      <SEO
        title="Local Restaurants — Browse & Order | FoodieHub"
        description="Browse top local restaurants on FoodieHub. Compare ratings, cuisines and delivery times, then order online for fast delivery."
        path="/restaurants"
        jsonLd={itemListJsonLd}
      />

      {/* Editorial Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 gradient-hero opacity-60" aria-hidden />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full gradient-accent opacity-20 blur-3xl animate-float" aria-hidden />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full gradient-primary opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }} aria-hidden />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
              Discover · Order · Devour
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05]">
              Hand-picked kitchens,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                delivered hot
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-xl">
              Browse the best local restaurants near you. Filter by cuisine, search by craving — order in two taps.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-4 my-6 glass-strong rounded-none sm:rounded-2xl">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative md:max-w-sm flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search restaurants or cuisine..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 rounded-xl bg-background/60 border-border/40"
                aria-label="Search restaurants"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground flex-shrink-0 hidden md:block" />
              <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 flex-1">
                {allTags.map((tag) => {
                  const active = selectedTag === tag;
                  return (
                    <motion.button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      whileTap={{ scale: 0.94 }}
                      className={`relative whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium smooth-transition border ${
                        active
                          ? 'text-primary-foreground border-transparent'
                          : 'text-foreground/70 hover:text-foreground border-border/40 bg-background/60'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-tag"
                          className="absolute inset-0 rounded-full gradient-primary glow-primary"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{tag}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Result count */}
        {!loading && (
          <motion.p
            key={`${selectedTag}-${query}-${filteredRestaurants.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground mb-4"
          >
            Showing <strong className="text-foreground">{filteredRestaurants.length}</strong> restaurant{filteredRestaurants.length === 1 ? '' : 's'}
          </motion.p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground">No restaurants found for your search.</p>
          </motion.div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.05, 0.4),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <RestaurantCard restaurant={restaurant} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
