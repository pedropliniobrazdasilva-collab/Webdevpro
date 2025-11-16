import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Order } from '../data/mock-orders.ts';
import { User } from '../types/user.ts';

// Storage Keys
const SESSION_STORAGE_KEY = 'webdevpro_currentUser';
const USERS_STORAGE_KEY = 'webdevpro_users';
const ORDERS_STORAGE_KEY = 'webdevpro_orders';

interface AppContextType {
  view: 'landing' | 'admin' | 'settings';
  setView: React.Dispatch<React.SetStateAction<'landing' | 'admin' | 'settings'>>;
  orders: Order[];
  currentUser: User | null;
  handleAdminLoginAttempt: (key: string) => boolean;
  handleSignUp: (newUser: User) => boolean;
  handleLogin: (credentials: Omit<User, 'email'>) => boolean;
  handleLogout: () => void;
  handleUpdateUser: (updatedUserInfo: Partial<User>) => { success: boolean, message: string };
  handleDeleteUser: () => void;
  handleAddOrder: (newOrder: Order) => void;
  handleUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  handleDeleteOrder: (orderId: string) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [view, setView] = useState<'landing' | 'admin' | 'settings'>('landing');
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Helper to save orders to state and localStorage
  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
  };
  
  // Effect for initial data load
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Failed to parse user from session storage:", error);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
    
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
    }
    
    try {
      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      setOrders(storedOrders ? JSON.parse(storedOrders) : []);
    } catch (error) {
      console.error("Failed to parse orders from local storage:", error);
      setOrders([]);
    }
  }, []);

  // --- Admin Auth ---
  const handleAdminLoginAttempt = (key: string): boolean => {
    if (key === 'biscoitoebolacha') {
      setView('admin');
      return true;
    }
    return false;
  };

  // --- User Auth ---
  const handleSignUp = (newUser: User): boolean => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];
    if (users.some(user => user.username.toLowerCase() === newUser.username.toLowerCase())) {
      return false;
    }
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    setCurrentUser(newUser);
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
    return true;
  };

  const handleLogin = (credentials: Omit<User, 'email'>): boolean => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];
    const user = users.find(u => u.username.toLowerCase() === credentials.username.toLowerCase() && u.password === credentials.password);
    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setView('landing');
  };
  
  // --- User Account Management ---
  const handleUpdateUser = (updatedUserInfo: Partial<User>): { success: boolean, message: string } => {
    if (!currentUser) return { success: false, message: 'Nenhum usuário logado.' };
    
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];
    
    if (updatedUserInfo.username && updatedUserInfo.username.toLowerCase() !== currentUser.username.toLowerCase()) {
      if (users.some(user => user.username.toLowerCase() === updatedUserInfo.username!.toLowerCase())) {
        return { success: false, message: 'Este nome de usuário já está em uso.' };
      }
    }
    
    const oldUsername = currentUser.username;
    const userIndex = users.findIndex(u => u.username.toLowerCase() === oldUsername.toLowerCase());
    if (userIndex === -1) return { success: false, message: 'Usuário não encontrado.' };

    const updatedUser = { ...users[userIndex], ...updatedUserInfo };
    users[userIndex] = updatedUser;

    if (updatedUserInfo.username && updatedUserInfo.username.toLowerCase() !== oldUsername.toLowerCase()) {
      const updatedOrders = orders.map(order => 
        order.username.toLowerCase() === oldUsername.toLowerCase() 
          ? { ...order, username: updatedUser.username } 
          : order
      );
      saveOrders(updatedOrders);
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    setCurrentUser(updatedUser);
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
    
    return { success: true, message: 'Dados atualizados com sucesso!' };
  };

  const handleDeleteUser = () => {
    if (!currentUser || !window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) return;
    
    let users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];
    users = users.filter(u => u.username.toLowerCase() !== currentUser.username.toLowerCase());
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
    const updatedOrders = orders.filter(order => order.username.toLowerCase() !== currentUser.username.toLowerCase());
    saveOrders(updatedOrders);
    
    handleLogout();
  };

  // --- Order Management ---
  const triggerAdminNotification = (order: Order) => {
    if (localStorage.getItem('webdevpro_notifications_enabled') === 'true' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Novo pedido recebido!', { body: `Cliente: ${order.customer.name}\nID: ${order.id}` });
    }
  };

  const handleAddOrder = (newOrder: Order) => {
    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    triggerAdminNotification(newOrder);
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    saveOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido permanentemente?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      saveOrders(updatedOrders);
    }
  };

  const contextValue = {
    view, setView, orders, currentUser,
    handleAdminLoginAttempt, handleSignUp, handleLogin, handleLogout,
    handleUpdateUser, handleDeleteUser,
    handleAddOrder, handleUpdateStatus, handleDeleteOrder,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
