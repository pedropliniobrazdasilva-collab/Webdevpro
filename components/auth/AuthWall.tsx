import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext.tsx';

const inputStyles = "w-full bg-slate-700/50 border-2 border-slate-600 rounded-md py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200";

// --- Login Form Component ---
interface LoginViewProps {
    username: string;
    password: string;
    error: string;
    onUsernameChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onSwitchToSignUp: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ username, password, error, onUsernameChange, onPasswordChange, onSubmit, onSwitchToSignUp }) => (
    <form onSubmit={onSubmit} className="p-8 space-y-4 w-full animate-fade-in-up-fast">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Bem-vindo de volta!</h2>
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nome de Usuário</label>
            <input type="text" value={username} onChange={(e) => onUsernameChange(e.target.value)} className={inputStyles} required autoFocus />
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
            <input type="password" value={password} onChange={(e) => onPasswordChange(e.target.value)} className={inputStyles} required />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Entrar</button>
        <p className="text-sm text-center text-slate-400">
            Não tem uma conta?{' '}
            <button type="button" onClick={onSwitchToSignUp} className="font-semibold text-primary-400 hover:underline focus:outline-none">Crie uma aqui</button>
        </p>
    </form>
);


// --- Sign Up Form Component ---
interface SignUpViewProps {
    username: string;
    password: string;
    confirmPassword: string;
    error: string;
    onUsernameChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onConfirmPasswordChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onSwitchToLogin: () => void;
}

const SignUpView: React.FC<SignUpViewProps> = ({ username, password, confirmPassword, error, onUsernameChange, onPasswordChange, onConfirmPasswordChange, onSubmit, onSwitchToLogin }) => (
    <form onSubmit={onSubmit} className="p-8 space-y-4 w-full animate-fade-in-up-fast">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Crie sua Conta</h2>
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nome de Usuário</label>
            <input type="text" value={username} onChange={(e) => onUsernameChange(e.target.value)} className={inputStyles} required />
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Senha (mín. 8 caracteres)</label>
            <input type="password" value={password} onChange={(e) => onPasswordChange(e.target.value)} className={inputStyles} required />
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Confirmar Senha</label>
            <input type="password" value={confirmPassword} onChange={(e) => onConfirmPasswordChange(e.target.value)} className={inputStyles} required />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Criar Conta</button>
        <p className="text-sm text-center text-slate-400">
            Já tem uma conta?{' '}
            <button type="button" onClick={onSwitchToLogin} className="font-semibold text-primary-400 hover:underline focus:outline-none">Faça login</button>
        </p>
    </form>
);


// --- Main AuthWall Component ---
const AuthWall: React.FC = () => {
  const { handleLogin, handleSignUp } = useContext(AppContext);
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Login form state and logic
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = handleLogin({ username: loginUsername, password: loginPassword });
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
    const success = handleSignUp({ username: signUpUsername, password: signUpPassword });
    if (!success) {
        setSignUpError('Falha ao criar conta. O nome de usuário pode já existir.');
    }
  };
  
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
           {isLoginView ? (
              <LoginView 
                username={loginUsername}
                password={loginPassword}
                error={loginError}
                onUsernameChange={setLoginUsername}
                onPasswordChange={setLoginPassword}
                onSubmit={handleLoginSubmit}
                onSwitchToSignUp={() => setIsLoginView(false)}
              />
            ) : (
              <SignUpView
                username={signUpUsername}
                password={signUpPassword}
                confirmPassword={confirmPassword}
                error={signUpError}
                onUsernameChange={setSignUpUsername}
                onPasswordChange={setSignUpPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onSubmit={handleSignUpSubmit}
                onSwitchToLogin={() => setIsLoginView(true)}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default AuthWall;