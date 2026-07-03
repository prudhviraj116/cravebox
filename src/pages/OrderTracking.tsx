import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Clock, CheckCircle2, Package, Bike, Home as HomeIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockAPI } from '@/services/api';
import type { Order } from '@/services/api';
import SEO from '@/components/SEO';
import FakeLiveMap from '@/components/FakeLiveMap';

const OrderTracking = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        // Replace with actual API call: orderAPI.getById(Number(orderId))
        const orderData = await mockAPI.getOrder(Number(orderId));
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: CheckCircle2 },
    { key: 'accepted', label: 'Accepted', icon: Package },
    { key: 'picked_up', label: 'Picked Up', icon: Bike },
    { key: 'on_the_way', label: 'On The Way', icon: MapPin },
    { key: 'delivered', label: 'Delivered', icon: HomeIcon },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <SEO
        title={`Track Order #${order.id} | FoodieHub`}
        description="Live tracking for your FoodieHub delivery."
        path={`/order-tracking/${order.id}`}
        noindex
      />
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full gradient-primary opacity-10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full gradient-secondary opacity-10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Track Your Order
        </h1>

        {/* Order Status Progress */}
        <Card className="glass-effect mb-8 animate-scale-in">
          <CardHeader>
            <h2 className="sr-only">Order Status</h2>
            <CardTitle>Order #{order.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-muted">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Status Steps */}
              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                          isCompleted
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                            : 'bg-muted text-muted-foreground'
                        } ${isCurrent ? 'animate-pulse scale-110' : ''}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-sm font-medium text-center ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <Card className="glass-effect animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <h2 className="sr-only">Live Location</h2>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Live Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-2 text-muted-foreground animate-bounce" />
                  <p className="text-sm text-muted-foreground">
                    Map integration here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add Google Maps or Mapbox API key
                  </p>
                </div>
              </div>
              
              {order.deliveryBoy && (
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Delivery Partner:</span> {order.deliveryBoy.name}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <a href={`tel:${order.deliveryBoy.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call {order.deliveryBoy.name}
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="glass-effect animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <h2 className="sr-only">Order Details</h2>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Order Time</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">
                    {order.deliveryAddress.street}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.deliveryAddress.city}, {order.deliveryAddress.zipCode}
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {order.status === 'delivered' && (
                <Button className="w-full gradient-primary" onClick={() => navigate('/')}>
                  Order Again
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Integration Notes */}
        <Card className="glass-effect mt-6 border-dashed animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 text-primary">🗺️ Map Integration Guide</h3>
            <p className="text-sm text-muted-foreground mb-2">
              To enable live tracking with Google Maps or Mapbox:
            </p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Get API key from Google Maps Platform or Mapbox</li>
              <li>Install: <code className="bg-muted px-1 py-0.5 rounded">npm install react-map-gl mapbox-gl</code></li>
              <li>Add map component with delivery boy's live location</li>
              <li>Use WebSocket or polling to update location in real-time</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;
