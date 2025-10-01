# API Integration Guide

## Overview
This food ordering website is built with a clean separation between frontend and backend, making it easy to connect to your Django (or any) backend API.

## Current State
- ✅ Full frontend UI with responsive design
- ✅ Cart management with Context API
- ✅ Order tracking page with status flow
- ✅ Mock API layer ready for backend integration
- ⏳ Backend API endpoints (to be connected)
- ⏳ Map integration (Google Maps/Mapbox)

## API Service Layer

All API calls are centralized in `src/services/api.ts`. Currently using mock data - switch to real API by:

### 1. Set Backend URL

Create `.env` file in project root:
```env
VITE_API_BASE_URL=http://localhost:8000/api
# or your deployed backend URL
# VITE_API_BASE_URL=https://api.yourdomain.com
```

### 2. Backend Endpoints Required

#### Restaurants
```
GET  /api/restaurants/          - List all restaurants
GET  /api/restaurants/:id/      - Get restaurant details
GET  /api/restaurants/:id/menu/ - Get restaurant menu
```

#### Orders
```
POST /api/orders/               - Create new order
GET  /api/orders/:id/           - Get order details
GET  /api/orders/my-orders/     - Get user's orders
GET  /api/orders/:id/track/     - Track order status
```

#### Delivery
```
GET  /api/deliveryboys/location/:orderId/ - Get delivery boy location
```

### 3. Replace Mock API Calls

In your components, replace:
```typescript
// Current (mock)
import { mockAPI } from '@/services/api';
const order = await mockAPI.createOrder(orderData);

// Replace with (real API)
import { orderAPI } from '@/services/api';
const order = await orderAPI.create(orderData);
```

### 4. Expected Data Structures

#### Order Creation
```typescript
{
  restaurantId: number,
  items: [
    { id: number, quantity: number, price: number }
  ],
  deliveryAddress: {
    street: string,
    city: string,
    zipCode: string,
    phone: string
  },
  totalPrice: number
}
```

#### Order Response
```typescript
{
  id: number,
  status: 'pending' | 'accepted' | 'picked_up' | 'on_the_way' | 'delivered',
  restaurantId: number,
  items: [...],
  deliveryAddress: {...},
  totalPrice: number,
  createdAt: string (ISO),
  deliveryBoy?: {
    id: number,
    name: string,
    phone: string,
    location: { lat: number, lng: number }
  }
}
```

## Map Integration

### Option 1: Google Maps

1. **Get API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Create API key

2. **Install Package**
   ```bash
   npm install @react-google-maps/api
   ```

3. **Add to OrderTracking.tsx**
   ```typescript
   import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
   
   const OrderTracking = () => {
     // ... existing code
     
     return (
       <GoogleMap
         zoom={13}
         center={{ lat: deliveryBoy.location.lat, lng: deliveryBoy.location.lng }}
       >
         <Marker position={restaurantLocation} label="Restaurant" />
         <Marker position={deliveryBoy.location} label="Delivery" />
         <Marker position={deliveryAddress} label="You" />
       </GoogleMap>
     );
   };
   ```

### Option 2: Mapbox (Recommended)

1. **Get API Token**
   - Sign up at [Mapbox](https://mapbox.com)
   - Get your public access token

2. **Install Package**
   ```bash
   npm install react-map-gl mapbox-gl
   ```

3. **Add Environment Variable**
   ```env
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. **Example Implementation**
   ```typescript
   import Map, { Marker, Source, Layer } from 'react-map-gl';
   import 'mapbox-gl/dist/mapbox-gl.css';
   
   <Map
     mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
     initialViewState={{
       latitude: deliveryBoy.location.lat,
       longitude: deliveryBoy.location.lng,
       zoom: 13
     }}
     mapStyle="mapbox://styles/mapbox/streets-v11"
   >
     <Marker 
       latitude={deliveryBoy.location.lat} 
       longitude={deliveryBoy.location.lng}
     />
   </Map>
   ```

## Real-time Updates

For live delivery tracking, implement WebSocket or polling:

### Polling (Simple)
```typescript
useEffect(() => {
  const interval = setInterval(async () => {
    const updated = await orderAPI.trackOrder(orderId);
    setOrder(updated);
  }, 10000); // Poll every 10 seconds
  
  return () => clearInterval(interval);
}, [orderId]);
```

### WebSocket (Better)
```typescript
useEffect(() => {
  const ws = new WebSocket(`ws://yourbackend.com/ws/orders/${orderId}/`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setOrder(data);
  };
  
  return () => ws.close();
}, [orderId]);
```

## Authentication

To add user authentication:

1. **Install Package**
   ```bash
   npm install @tanstack/react-query axios
   ```

2. **Create Auth Context**
   ```typescript
   // src/contexts/AuthContext.tsx
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(localStorage.getItem('token'));
   ```

3. **Add to API Calls**
   ```typescript
   headers: {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json'
   }
   ```

## Testing the Integration

1. **Start Backend**
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Update Frontend URL**
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

3. **Test Flow**
   - Browse restaurants
   - Add items to cart
   - Place order
   - Track order status
   - See live delivery location

## Deployment

### Frontend
- Deploy to Vercel, Netlify, or any static host
- Set environment variables in hosting platform

### Backend
- Ensure CORS is configured
- Update ALLOWED_HOSTS in Django
- Set up proper authentication

## Next Steps

- [ ] Connect to backend API
- [ ] Add map integration
- [ ] Implement authentication
- [ ] Set up WebSocket for real-time updates
- [ ] Add payment gateway integration
- [ ] Implement order notifications

## Need Help?

Check these files:
- `src/services/api.ts` - API service layer
- `src/contexts/OrderContext.tsx` - Order state management
- `src/pages/OrderTracking.tsx` - Tracking page with map placeholder
- `src/pages/Checkout.tsx` - Order creation flow
