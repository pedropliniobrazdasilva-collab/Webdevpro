import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import AdminLoginModal from './components/admin/AdminLoginModal.tsx';
import AuthWall from './components/auth/AuthWall.tsx';
import { Order } from './data/mock-orders.ts';
import { User } from './types/user.ts';

// Dynamic imports for code splitting
const LandingPage = lazy(() => import('./components/LandingPage.tsx'));
const AdminPage = lazy(() => import('./components/AdminPage.tsx'));
const SettingsPage = lazy(() => import('./components/SettingsPage.tsx'));


// Chaves para armazenar dados no navegador
const SESSION_STORAGE_KEY = 'webdevpro_currentUser';
const USERS_STORAGE_KEY = 'webdevpro_users';
const ORDERS_STORAGE_KEY = 'webdevpro_orders';

// Fallback loader for Suspense
const AppSpinner: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
    <div className="loader-spinner"></div>
  </div>
);

const App: React.FC = () => {
  // Estado da Aplicação
  const [view, setView] = useState<'landing' | 'admin' | 'settings'>('landing');
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Estado de Autenticação de Usuário
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Estado de Autenticação de Administrador
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Helper function to save orders to state and localStorage
  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
  };
  
  // Efeito para carregar dados da sessão e remover o loader inicial
  useEffect(() => {
    // Carrega usuário logado da sessão
    try {
      const storedUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from session storage:", error);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
    
    // Carrega ou inicializa usuários do localStorage para garantir consistência
    try {
        const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
        if (!storedUsers) {
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
        }
    } catch (error) {
        console.error("Failed to process users from local storage:", error);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
    }
    
    // Carrega pedidos do localStorage ou inicia com array vazio
    try {
        const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        } else {
            setOrders([]);
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([]));
        }
    } catch (error) {
        console.error("Failed to parse orders from local storage:", error);
        setOrders([]); // Fallback para vazio em caso de erro
    }

    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, []);


  // --- Lógica de Navegação ---
  const handleGoBackToLanding = () => {
    setView('landing');
  };

  // --- Lógica de Autenticação de Administrador ---
  const handleAdminLoginAttempt = (key: string): boolean => {
    if (key === 'biscoitoebolacha') {
      setView('admin');
      setIsAdminLoginModalOpen(false);
      return true;
    }
    return false;
  };

  // --- Lógica de Autenticação de Usuário ---
  const handleSignUp = (newUser: User): boolean => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];
    const userExists = users.some(user => user.username.toLowerCase() === newUser.username.toLowerCase());
    
    if (userExists) {
      alert('Este nome de usuário já está em uso. Por favor, escolha outro.');
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
    setView('landing'); // Garante que o usuário volte para a página inicial ao sair
  };
  
  // --- Lógica de Gerenciamento de Conta de Usuário ---
  const handleUpdateUser = (updatedUserInfo: Partial<User>): { success: boolean, message: string } => {
    if (!currentUser) return { success: false, message: 'Nenhum usuário logado.' };
    
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];
    
    // Verifica se o novo nome de usuário já está em uso
    if (updatedUserInfo.username && updatedUserInfo.username.toLowerCase() !== currentUser.username.toLowerCase()) {
      const isUsernameTaken = users.some(user => user.username.toLowerCase() === updatedUserInfo.username!.toLowerCase());
      if (isUsernameTaken) {
        return { success: false, message: 'Este nome de usuário já está em uso.' };
      }
    }
    
    const oldUsername = currentUser.username;
    const userIndex = users.findIndex(u => u.username.toLowerCase() === oldUsername.toLowerCase());
    if (userIndex === -1) return { success: false, message: 'Usuário não encontrado.' };

    const updatedUser = { ...users[userIndex], ...updatedUserInfo };
    users[userIndex] = updatedUser;

    // Se o nome de usuário foi alterado, atualiza os pedidos associados
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
    if (!currentUser) return;
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão perdidos.')) {
      // Remove o usuário da lista de usuários
      let users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];
      users = users.filter(u => u.username.toLowerCase() !== currentUser.username.toLowerCase());
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      
      // Remove os pedidos associados ao usuário
      const updatedOrders = orders.filter(order => order.username.toLowerCase() !== currentUser.username.toLowerCase());
      saveOrders(updatedOrders);
      
      handleLogout();
    }
  };

  // --- Lógica de Gerenciamento de Pedidos ---
   const triggerAdminNotification = (order: Order) => {
    const notificationsEnabled = localStorage.getItem('webdevpro_notifications_enabled') === 'true';
    if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification('Novo pedido recebido!', {
            body: `Cliente: ${order.customer.name}\nID: ${order.id}`,
        });
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
    if (window.confirm('Tem certeza que deseja excluir este pedido permanentemente? Esta ação não pode ser desfeita.')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      saveOrders(updatedOrders);
    }
  };

  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter(order => order.username.toLowerCase() === currentUser.username.toLowerCase());
  }, [orders, currentUser]);

  const renderContent = () => {
    switch(view) {
      case 'admin':
        return (
          <AdminPage 
            onGoBack={handleGoBackToLanding}
            orders={orders}
            onUpdateStatus={handleUpdateStatus}
            onDeleteOrder={handleDeleteOrder}
          />
        );
      case 'settings':
        if (!currentUser) {
            setView('landing'); // Proteção de rota: se não há usuário, volta para landing
            return null;
        }
        return (
          <SettingsPage 
            currentUser={currentUser}
            userOrders={userOrders}
            onGoBack={handleGoBackToLanding}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        );
      case 'landing':
      default:
        return (
          <LandingPage 
            onAdminAccessClick={() => setIsAdminLoginModalOpen(true)} 
            onAddOrder={handleAddOrder}
            currentUser={currentUser}
            onLogout={handleLogout}
            onSettingsClick={() => setView('settings')}
          />
        );
    }
  }

  if (!currentUser) {
    return <AuthWall onLogin={handleLogin} onSignUp={handleSignUp} />;
  }


  return (
    <div className="min-h-screen">
      <Suspense fallback={<AppSpinner />}>
        {renderContent()}
      </Suspense>
      
      <AdminLoginModal 
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLogin={handleAdminLoginAttempt}
      />
    </div>
  );
};

export default App;