import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface FoodItemProps {
  item: MenuItem;
  restaurantId: number;
}

const FoodItem = ({ item, restaurantId }: FoodItemProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId,
    });
    toast({
      title: 'Added to cart!',
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden group smooth-transition hover:shadow-xl border-border/50">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover smooth-transition group-hover:scale-110"
        />
        <Button
          size="icon"
          onClick={handleAddToCart}
          className="absolute top-3 right-3 gradient-accent rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 smooth-transition glow-primary hover:scale-110"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{item.name}</h3>
          <span className="text-lg font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {item.category}
        </span>
      </CardContent>
    </Card>
  );
};

export default FoodItem;
