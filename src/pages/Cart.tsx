import { Link } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="w-32 h-32 rounded-full gradient-primary mx-auto flex items-center justify-center opacity-20">
            <ShoppingBag className="h-16 w-16" />
          </div>
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">
            Add some delicious items to get started!
          </p>
          <Link to="/restaurants">
            <Button className="gradient-primary">Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Your Cart
          </h1>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-destructive hover:text-destructive"
          >
            Clear All
          </Button>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden animate-scale-in">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-lg text-primary font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-3 mt-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="ml-auto text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Order Summary */}
          <Card className="glass-effect">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span>$3.99</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${(totalPrice + 3.99).toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout">
                <Button className="w-full gradient-primary text-lg py-6 glow-primary group">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
