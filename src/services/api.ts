// API Service Layer for Backend Integration
// Replace these base URLs with your actual backend endpoints

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Generic fetch wrapper with error handling
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Restaurant APIs
export const restaurantAPI = {
  getAll: () => apiFetch<any[]>('/restaurants/'),
  getById: (id: number) => apiFetch<any>(`/restaurants/${id}/`),
  getMenu: (id: number) => apiFetch<any[]>(`/restaurants/${id}/menu/`),
};

// Order APIs
export interface CreateOrderData {
  restaurantId: number;
  items: Array<{
    id: number;
    quantity: number;
    price: number;
  }>;
  deliveryAddress: {
    street: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  totalPrice: number;
}

export interface Order {
  id: number;
  status: 'pending' | 'accepted' | 'picked_up' | 'on_the_way' | 'delivered';
  restaurantId: number;
  items: any[];
  deliveryAddress: any;
  totalPrice: number;
  createdAt: string;
  deliveryBoy?: {
    id: number;
    name: string;
    phone: string;
    location: {
      lat: number;
      lng: number;
    };
  };
}

export const orderAPI = {
  create: (data: CreateOrderData) => apiFetch<Order>('/orders/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getById: (id: number) => apiFetch<Order>(`/orders/${id}/`),
  
  getMyOrders: () => apiFetch<Order[]>('/orders/my-orders/'),
  
  trackOrder: (id: number) => apiFetch<Order>(`/orders/${id}/track/`),
};

// Delivery Boy APIs
export const deliveryAPI = {
  getLocation: (orderId: number) => 
    apiFetch<{ lat: number; lng: number }>(`/deliveryboys/location/${orderId}/`),
};

// Mock API calls for testing (remove when backend is ready)
export const mockAPI = {
  createOrder: async (data: CreateOrderData): Promise<Order> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Math.floor(Math.random() * 10000),
      status: 'pending',
      restaurantId: data.restaurantId,
      items: data.items,
      deliveryAddress: data.deliveryAddress,
      totalPrice: data.totalPrice,
      createdAt: new Date().toISOString(),
    };
  },
  
  getOrder: async (id: number): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id,
      status: 'on_the_way',
      restaurantId: 1,
      items: [],
      deliveryAddress: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001',
      },
      totalPrice: 45.99,
      createdAt: new Date().toISOString(),
      deliveryBoy: {
        id: 1,
        name: 'John Doe',
        phone: '+1234567890',
        location: {
          lat: 40.7128,
          lng: -74.0060,
        },
      },
    };
  },
};
