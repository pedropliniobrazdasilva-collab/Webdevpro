import React, { useState } from 'react';
import { User } from '../../types/user.ts';

interface AuthWallProps {
  onLogin: (credentials: Omit<User, 'email'>) => boolean;
  onSignUp: (newUser: User) => boolean;
}

const AuthWall: React.FC<AuthWallProps> = ({ onLogin, onSignUp }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Login form state and logic
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = onLogin({ username: loginUsername, password: loginPassword });
    if (!success) {
      setLoginError('Nome de usuário ou senha inválidos.');
    }
  };

  // SignUp form state and logic
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');
    if (signUpPassword.length < 8) {
        setSignUpError('A senha deve ter no mínimo 8 caracteres.');
        return;
    }
    if (signUpPassword !== confirmPassword) {
        setSignUpError('As senhas não coincidem.');
        return;
    }
    const success = onSignUp({ username: signUpUsername, password: signUpPassword });
    if (!success) {
        setSignUpError('Falha ao criar conta. O nome de usuário pode já existir.');
    }
  };

  const inputStyles = "w-full bg-slate-700/50 border-2 border-slate-600 rounded-md py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200";

  const LoginView = () => (
    <form onSubmit={handleLoginSubmit} className="p-8 space-y-4 w-full animate-fade-in-fast">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Bem-vindo de volta!</h2>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Nome de Usuário</label>
        <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className={inputStyles} required autoFocus />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className={inputStyles} required />
      </div>
      {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
      <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Entrar</button>
      <p className="text-sm text-center text-slate-400">
        Não tem uma conta?{' '}
        <button type="button" onClick={() => setIsLoginView(false)} className="font-semibold text-primary-400 hover:underline">Crie uma aqui</button>
      </p>
    </form>
  );

  const SignUpView = () => (
      <form onSubmit={handleSignUpSubmit} className="p-8 space-y-4 w-full animate-fade-in-fast">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Crie sua Conta</h2>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Nome de Usuário</label>
          <input type="text" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} className={inputStyles} required autoFocus />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Senha (mín. 8 caracteres)</label>
          <input type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className={inputStyles} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Confirmar Senha</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputStyles} required />
        </div>
        {signUpError && <p className="text-red-400 text-sm text-center">{signUpError}</p>}
        <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Criar Conta</button>
        <p className="text-sm text-center text-slate-400">
          Já tem uma conta?{' '}
          <button type="button" onClick={() => setIsLoginView(true)} className="font-semibold text-primary-400 hover:underline">Faça login</button>
        </p>
      </form>
  );
  
  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center p-4">
       <div className="absolute inset-0 bg-grid-slate-800"></div>
       <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
       
       <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-4">
            WebDev<span className="text-primary-500">Pro</span>
        </h1>
        <p className="text-slate-300 text-center mb-8">Faça login ou crie uma conta para continuar.</p>
        
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg shadow-2xl w-full">
           {isLoginView ? <LoginView /> : <SignUpView />}
        </div>
      </div>
    </div>
  );
};

export default AuthWall;
