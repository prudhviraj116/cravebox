import { User, MapPin, CreditCard, Clock, Settings, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { orders } = useOrder();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-700 dark:text-green-400';
      case 'on_the_way':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'picked_up':
        return 'bg-purple-500/20 text-purple-700 dark:text-purple-400';
      case 'accepted':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
    }
  };
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          My Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-effect animate-scale-in">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center">
                    <User className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-muted-foreground">john.doe@email.com</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Saved Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  123 Main Street
                  <br />
                  New York, NY 10001
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  •••• •••• •••• 4242
                  <br />
                  Expires 12/25
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <Card className="glass-effect animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Order History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No orders yet</p>
                    <Link to="/restaurants">
                      <Button className="mt-4">Start Ordering</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-xl bg-muted/50 space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              Order #{order.id}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {order.items.length} items
                            </p>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            ${order.totalPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <Link to={`/order-tracking/${order.id}`}>
                          <Button variant="outline" className="w-full">
                            Track Order
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
