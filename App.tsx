import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { AppContext } from './contexts/AppContext.tsx';
import AuthWall from './components/auth/AuthWall.tsx';
import AdminLoginModal from './components/admin/AdminLoginModal.tsx';

// Dynamic imports for code splitting
const LandingPage = lazy(() => import('./components/LandingPage.tsx'));
const AdminPage = lazy(() => import('./components/AdminPage.tsx'));
const SettingsPage = lazy(() => import('./components/SettingsPage.tsx'));

// Fallback loader for Suspense
const AppSpinner: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
    <div className="loader-spinner"></div>
  </div>
);

const App: React.FC = () => {
  const { view, currentUser, handleAdminLoginAttempt } = useContext(AppContext);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Efeito para remover o loader inicial
  useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, []);
  
  const handleOpenAdminModal = () => setIsAdminLoginModalOpen(true);
  const handleCloseAdminModal = () => setIsAdminLoginModalOpen(false);

  const onAdminLogin = (key: string): boolean => {
      const success = handleAdminLoginAttempt(key);
      if (success) {
          handleCloseAdminModal();
      }
      return success;
  };

  const renderContent = () => {
    switch(view) {
      case 'admin':
        return <AdminPage />;
      case 'settings':
        return <SettingsPage />;
      case 'landing':
      default:
        return <LandingPage onAdminAccessClick={handleOpenAdminModal} />;
    }
  }
  
  // Se não houver usuário logado, exibe o AuthWall
  if (!currentUser) {
    return <AuthWall />;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Suspense fallback={<AppSpinner />}>
        {renderContent()}
      </Suspense>
      
      <AdminLoginModal 
        isOpen={isAdminLoginModalOpen}
        onClose={handleCloseAdminModal}
        onLogin={onAdminLogin}
      />
    </div>
  );
};

export default App;