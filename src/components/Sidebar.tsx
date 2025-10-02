import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Home, Store, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/restaurants', icon: Store, label: 'Restaurants' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: totalItems },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 glass-strong z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              FoodieHub
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 p-3 rounded-xl smooth-transition ${
                    isActive(item.path)
                      ? 'gradient-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-auto h-6 w-6 rounded-full gradient-accent text-xs font-bold flex items-center justify-center text-accent-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {user ? (
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => {
                  signOut();
                  onClose();
                }}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => {
                  navigate('/auth');
                  onClose();
                }}
              >
                <User className="h-5 w-5 mr-3" />
                Login
              </Button>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              © 2025 FoodieHub. All rights reserved.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
