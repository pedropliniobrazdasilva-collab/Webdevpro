import React, { useState } from 'react';
import { User } from '../../types/user.ts';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: Omit<User, 'email'>) => boolean;
  onSwitchToSignUp: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onSwitchToSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin({ username, password });
    if (!success) {
      setError('Nome de usuário ou senha inválidos.');
    } else {
      setUsername('');
      setPassword('');
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
          <h2 className="text-xl font-bold text-white">Login</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nome de Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              autoFocus
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          
          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Entrar
          </button>

           <p className="text-sm text-center text-slate-400">
            Não tem uma conta?{' '}
            <button type="button" onClick={onSwitchToSignUp} className="font-semibold text-primary-400 hover:underline">
              Crie uma aqui
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
