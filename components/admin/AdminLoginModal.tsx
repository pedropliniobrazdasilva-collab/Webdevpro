import React, { useState } from 'react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (key: string) => boolean;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(key);
    if (!success) {
      setError('Chave de acesso inválida. Tente novamente.');
    }
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl w-full max-w-sm flex flex-col animate-fade-in-up">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Acesso Administrativo</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="admin-key" className="block text-sm font-medium text-slate-300 mb-2">
              Chave de Acesso
            </label>
            <input
              type="password"
              id="admin-key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-md py-2 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              autoFocus
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          
          <button 
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
