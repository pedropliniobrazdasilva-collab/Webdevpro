import React, { useState, useEffect, useMemo } from 'react';
import LandingPage from './components/LandingPage.tsx';
import AdminPage from './components/AdminPage.tsx';
import SettingsPage from './components/SettingsPage.tsx';
import AdminLoginModal from './components/admin/AdminLoginModal.tsx';
import AuthWall from './components/auth/AuthWall.tsx';
import { Order, mockOrders } from './data/mock-orders.ts';
import { User } from './types/user.ts';

// Chaves para armazenar dados no navegador
const SESSION_STORAGE_KEY = 'webdevpro_currentUser';
const USERS_STORAGE_KEY = 'webdevpro_users';
const ORDERS_STORAGE_KEY = 'webdevpro_orders';

const App: React.FC = () => {
  // Estado da Aplicação
  const [view, setView] = useState<'landing' | 'admin' | 'settings'>('landing');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAppLoading, setIsAppLoading] = useState(true);
  
  // Estado de Autenticação de Usuário
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Estado de Autenticação de Administrador
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

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
    
    // Carrega pedidos do localStorage
    try {
        const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        } else {
            // Se não houver pedidos, inicializa com os mocks e salva
            setOrders(mockOrders);
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(mockOrders));
        }
    } catch (error) {
        console.error("Failed to parse orders from local storage:", error);
        setOrders(mockOrders); // Fallback para os mocks em caso de erro
    }

    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
    
    setIsAppLoading(false);
  }, []);

  // Efeito para salvar os pedidos no localStorage sempre que forem alterados
  useEffect(() => {
    // Evita salvar um array vazio na primeira renderização antes dos dados serem carregados
    if (orders.length > 0) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders]);


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
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.username.toLowerCase() === oldUsername.toLowerCase() 
            ? { ...order, username: updatedUser.username } 
            : order
        )
      );
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
      setOrders(prevOrders => prevOrders.filter(order => order.username.toLowerCase() !== currentUser.username.toLowerCase()));
      
      handleLogout();
    }
  };

  // --- Lógica de Gerenciamento de Pedidos ---
  const handleAddOrder = (newOrder: Order) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido permanentemente? Esta ação não pode ser desfeita.')) {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    }
  };
  
  const handleResetOrders = () => {
    if (window.confirm('Tem certeza que deseja restaurar os dados? Todas as alterações e novos pedidos serão perdidos e substituídos pelos dados de demonstração.')) {
        localStorage.removeItem(ORDERS_STORAGE_KEY);
        setOrders(mockOrders);
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(mockOrders));
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
            onResetOrders={handleResetOrders}
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
  
  if (isAppLoading) {
    return null; // A tela de carregamento inicial é controlada pelo index.html
  }

  if (!currentUser) {
    return <AuthWall onLogin={handleLogin} onSignUp={handleSignUp} />;
  }


  return (
    <div className="min-h-screen">
      {renderContent()}
      
      <AdminLoginModal 
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLogin={handleAdminLoginAttempt}
      />
    </div>
  );
};

export default App;