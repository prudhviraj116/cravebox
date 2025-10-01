import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  tags: string[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link to={`/menu/${restaurant.id}`} className="group">
      <Card className="overflow-hidden smooth-transition hover:shadow-2xl hover:-translate-y-2 border-border/50">
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover smooth-transition group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
            <p className="text-sm opacity-90">{restaurant.cuisine}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{restaurant.deliveryTime}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {restaurant.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
