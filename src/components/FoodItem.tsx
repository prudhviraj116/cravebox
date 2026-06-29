import { Plus, Check } from 'lucide-react';
import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface FoodItemProps {
  item: MenuItemType;
  restaurantId: number;
}

const FoodItem = ({ item, restaurantId }: FoodItemProps) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = useCallback(() => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId,
    });
    setJustAdded(true);
    toast.success('Added to cart', { description: item.name });
    window.setTimeout(() => setJustAdded(false), 900);
  }, [addToCart, item, restaurantId]);

  return (
    <motion.div
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="h-full"
    >
      <Card className="overflow-hidden group h-full border-border/40 rounded-2xl shadow-card hover:shadow-2xl smooth-transition bg-card/80 backdrop-blur-sm">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-background/90 backdrop-blur-md text-foreground/80 border border-border/40">
            {item.category}
          </span>
          <motion.div
            className="absolute bottom-3 right-3"
            whileTap={{ scale: 0.85 }}
          >
            <Button
              size="icon"
              onClick={handleAddToCart}
              aria-label={`Add ${item.name} to cart`}
              className="gradient-accent rounded-full w-11 h-11 shadow-lg glow-primary smooth-transition hover:scale-110"
            >
              <motion.span
                key={justAdded ? 'check' : 'plus'}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="flex"
              >
                {justAdded ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </motion.span>
            </Button>
          </motion.div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-1.5 gap-3">
            <h3 className="font-semibold text-base leading-snug line-clamp-1">{item.name}</h3>
            <span className="text-base font-bold text-primary whitespace-nowrap">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default memo(FoodItem);
