import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Order, OrderItem, OrderStatus } from '../types';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { getApiUrl } from '../config/env';

interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  isCreatingOrder: boolean;
  activeOrder: Order | null;
  createOrder: (orderPayload: {
    customerName: string;
    customerEmail: string;
    companyName: string;
    phone: string;
    gstin?: string;
    billingAddress: string;
    shippingAddress?: string;
    items: OrderItem[];
    notes?: string;
    purchaseOrderNumber?: string;
  }) => Promise<{ success: boolean; orderId?: string; error?: string; data?: Order }>;
  fetchOrderById: (orderId: string) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => Promise<boolean>;
  refreshOrders: () => Promise<void>;
  filterStatus: OrderStatus | 'ALL';
  setFilterStatus: (status: OrderStatus | 'ALL') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  const { showToast } = useNotification();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const refreshOrders = useCallback(async () => {
    if (!token) {
      setOrders([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl('/orders'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setOrders(json.data);
        }
      }
    } catch (err) {
      console.warn('API fetch orders notice:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const createOrder = async (orderPayload: {
    customerName: string;
    customerEmail: string;
    companyName: string;
    phone: string;
    gstin?: string;
    billingAddress: string;
    shippingAddress?: string;
    items: OrderItem[];
    notes?: string;
    purchaseOrderNumber?: string;
  }) => {
    setIsLoading(true);
    try {
      const payload = {
        ...orderPayload,
        customerId: user?.uid || user?.id || `cust-${Date.now().toString(36)}`
      };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(getApiUrl('/orders'), {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        showToast('Order Submission Failed', json.error || 'Validation error encountered.', 'error');
        return { success: false, error: json.error || 'Submission failed' };
      }

      const createdOrder: Order = json.data;
      setActiveOrder(createdOrder);
      setOrders(prev => [createdOrder, ...prev]);

      showToast(
        'Order Confirmed',
        `Order ${createdOrder.id} successfully registered with server-calculated GST and warranty certificate.`,
        'success',
        6000
      );

      return { success: true, orderId: createdOrder.id, data: createdOrder };
    } catch (err: any) {
      console.error('Order creation error:', err);
      showToast('Network Error', 'Failed to communicate with LR Techno Park Order API.', 'error');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderById = async (orderId: string): Promise<Order | null> => {
    const cleanId = orderId.trim().toUpperCase();
    const existing = orders.find(o => o.id.toUpperCase() === cleanId);
    if (existing) {
      setActiveOrder(existing);
      return existing;
    }

    try {
      // First try authenticated order route if token present
      if (token) {
        const res = await fetch(getApiUrl(`/orders/${encodeURIComponent(cleanId)}`), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setActiveOrder(json.data);
            return json.data;
          }
        }
      }

      // Fallback to tracking endpoint for public tracker lookup
      const trackRes = await fetch(getApiUrl(`/orders/track/${encodeURIComponent(cleanId)}`));
      if (trackRes.ok) {
        const trackJson = await trackRes.json();
        if (trackJson.success && trackJson.data) {
          return trackJson.data as Order;
        }
      }
    } catch (err) {
      console.warn('Error fetching order by ID:', err);
    }
    return null;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus, note?: string): Promise<boolean> => {
    if (!token) {
      showToast('Authentication Required', 'Please log in with staff credentials to update order status.', 'error');
      return false;
    }

    try {
      const res = await fetch(getApiUrl(`/orders/${encodeURIComponent(orderId)}/status`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status,
          note: note || `Status transitioned to ${status}`,
          actor: user?.displayName || 'Authorized Operations'
        })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        const updated: Order = json.data;
        setOrders(prev => prev.map(o => (o.id === updated.id ? updated : o)));
        if (activeOrder && activeOrder.id === updated.id) {
          setActiveOrder(updated);
        }
        showToast('Status Updated', `Order ${orderId} transitioned to ${status}`, 'success');
        return true;
      } else {
        showToast('Permission Denied', json.error || 'Only authorized staff can transition order status.', 'error');
        return false;
      }
    } catch (err: any) {
      showToast('Error', err.message || 'Failed to update order status', 'error');
      return false;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        isLoading,
        isCreatingOrder: isLoading,
        activeOrder,
        createOrder,
        fetchOrderById,
        updateOrderStatus,
        refreshOrders,
        filterStatus,
        setFilterStatus,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
