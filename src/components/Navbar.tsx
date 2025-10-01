import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, User, Utensils } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="gradient-primary p-2 rounded-xl smooth-transition group-hover:scale-110 glow-primary">
              <Utensils className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden sm:block">
              FoodieHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                className={isActive('/') ? 'gradient-primary' : ''}
              >
                Home
              </Button>
            </Link>
            <Link to="/restaurants">
              <Button
                variant={isActive('/restaurants') ? 'default' : 'ghost'}
                className={isActive('/restaurants') ? 'gradient-primary' : ''}
              >
                Restaurants
              </Button>
            </Link>
            <Link to="/cart">
              <Button
                variant={isActive('/cart') ? 'default' : 'ghost'}
                className={`relative ${isActive('/cart') ? 'gradient-primary' : ''}`}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full gradient-accent text-xs font-bold flex items-center justify-center text-accent-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                variant={isActive('/profile') ? 'default' : 'ghost'}
                className={isActive('/profile') ? 'gradient-primary' : ''}
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Cart Icon */}
          <Link to="/cart" className="lg:hidden relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full gradient-accent text-xs font-bold flex items-center justify-center text-accent-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
