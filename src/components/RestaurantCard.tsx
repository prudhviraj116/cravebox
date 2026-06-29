import { Link } from 'react-router-dom';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  tags: string[];
  location?: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="h-full"
    >
      <Link to={`/menu/${restaurant.id}`} className="group block h-full" aria-label={`View menu for ${restaurant.name}`}>
        <Card className="overflow-hidden h-full rounded-2xl border-border/40 bg-card/80 backdrop-blur-sm shadow-card hover:shadow-2xl smooth-transition">
          <div className="relative h-52 overflow-hidden">
            <motion.img
              src={restaurant.image}
              alt={restaurant.name}
              loading="lazy"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Rating badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border/40 text-xs font-semibold">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              {restaurant.rating}
            </div>

            {/* Hover arrow */}
            <motion.div
              className="absolute top-3 right-3 w-9 h-9 rounded-full gradient-accent flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition glow-primary"
              initial={false}
              whileHover={{ rotate: 45 }}
            >
              <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
            </motion.div>

            <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
              <h3 className="font-bold text-xl tracking-tight drop-shadow-md">{restaurant.name}</h3>
              <p className="text-sm opacity-90">{restaurant.cuisine}</p>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {restaurant.deliveryTime}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {restaurant.location ?? 'Nearby'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {restaurant.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-muted/70 text-muted-foreground border border-border/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default memo(RestaurantCard);
