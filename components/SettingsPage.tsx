import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext.tsx';
import { Order } from '../data/mock-orders.ts';

// Icons for UI improvement
const DocumentTextIcon: React.FC = () => ( <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z" /></svg> );
const UserCircleIcon: React.FC = () => ( <svg className="w-6 h-6 mr-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg> );
const ExclamationTriangleIcon: React.FC = () => ( <svg className="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> );

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-bold rounded-full text-white tracking-wide";
  const statusClasses: Record<Order['status'], string> = {
    'Aguardando Confirmação': "bg-yellow-500/80",
    Pendente: "bg-sky-500/80",
    'Em produção': "bg-blue-500/80",
    Concluído: "bg-green-500/80",
    Cancelado: "bg-slate-600",
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const SettingsPage: React.FC = () => {
  const { currentUser, orders, setView, handleUpdateUser, handleDeleteUser } = useContext(AppContext);

  // States for forms
  const [newUsername, setNewUsername] = useState(currentUser!.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // States for feedback messages
  const [usernameMessage, setUsernameMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Sync local state with props to prevent stale data after updates
  useEffect(() => {
    setNewUsername(currentUser!.username);
  }, [currentUser]);

  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter(order => order.username.toLowerCase() === currentUser.username.toLowerCase());
  }, [orders, currentUser]);

  const handleUsernameUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameMessage({ type: '', text: '' });
    if (!newUsername.trim()) {
        setUsernameMessage({ type: 'error', text: 'O nome de usuário não pode estar vazio.' });
        return;
    }
    if (newUsername === currentUser!.username) {
        setUsernameMessage({ type: 'info', text: 'Este já é o seu nome de usuário atual.' });
        return;
    }
    const result = handleUpdateUser({ username: newUsername });
    if (result.success) {
        setUsernameMessage({ type: 'success', text: result.message });
    } else {
        setUsernameMessage({ type: 'error', text: result.message });
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (currentPassword !== currentUser!.password) {
        setPasswordMessage({ type: 'error', text: 'A senha atual está incorreta.' });
        return;
    }
     if (newPassword.length < 8) {
        setPasswordMessage({ type: 'error', text: 'A nova senha deve ter no mínimo 8 caracteres.' });
        return;
    }
    if (newPassword !== confirmNewPassword) {
        setPasswordMessage({ type: 'error', text: 'As novas senhas não coincidem.' });
        return;
    }
     if (newPassword === currentPassword) {
        setPasswordMessage({ type: 'error', text: 'A nova senha deve ser diferente da atual.' });
        return;
    }

    const result = handleUpdateUser({ password: newPassword });
    if (result.success) {
        setPasswordMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    } else {
        setPasswordMessage({ type: 'error', text: result.message || 'Ocorreu um erro ao alterar a senha.' });
    }
  };
  
  const FeedbackMessage: React.FC<{ message: { type: string, text: string } }> = ({ message }) => {
    if (!message.text) return null;
    const isSuccess = message.type === 'success';
    const isError = message.type === 'error';

    const colorClasses = isSuccess 
      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
      : isError
      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
      : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'; // Info
      
    const Icon = isSuccess 
      ? () => <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
      : isError
      ? () => <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
      : () => <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;

    return (
        <div className={`flex items-center gap-2 text-sm p-3 rounded-md ${colorClasses}`}>
            <Icon />
            <span>{message.text}</span>
        </div>
    );
  };

  const inputStyles = "w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg py-2.5 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200";
  const buttonStyles = "w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";

  if (!currentUser) {
    setView('landing');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans animate-fade-in">
      <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                 <button onClick={() => setView('landing')} className="text-2xl font-bold text-white text-left">
                    WebDev<span className="text-primary-500">Pro</span>
                </button>
                <button onClick={() => setView('landing')} className="flex items-center gap-2 text-sm text-slate-300 hover:bg-slate-700 px-4 py-2 rounded-lg font-semibold transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Voltar ao Site
                </button>
            </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Minha Conta</h1>
          <p className="text-slate-400 mt-1">Gerencie seus pedidos e informações pessoais.</p>

          <div className="mt-12 space-y-12">
            
            {/* Seção Alterar Dados */}
            <section id="alterar-dados">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center"><UserCircleIcon /> Alterar Dados Pessoais</h2>
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 sm:p-8 space-y-10">
                {/* Form Username */}
                <form onSubmit={handleUsernameUpdate} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Alterar Nome de Usuário</h3>
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">Novo nome de usuário</label>
                    <input id="username" type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} required className={inputStyles}/>
                  </div>
                  <FeedbackMessage message={usernameMessage} />
                  <div className="pt-2">
                    <button type="submit" disabled={newUsername === currentUser.username || !newUsername.trim()} className={buttonStyles}>Salvar Nome de Usuário</button>
                  </div>
                </form>
                
                <hr className="border-slate-700/50" />
                
                {/* Form Password */}
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Alterar Senha</h3>
                   <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Senha Atual</label>
                    <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className={inputStyles} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nova Senha (mín. 8 caracteres)</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className={inputStyles} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Confirmar Nova Senha</label>
                    <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} required className={inputStyles} />
                  </div>
                  <FeedbackMessage message={passwordMessage} />
                  <div className="pt-2">
                    <button type="submit" className={buttonStyles}>Alterar Senha</button>
                  </div>
                </form>
              </div>
            </section>
            
            {/* Seção Meus Pedidos */}
            <section id="meus-pedidos">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center"><DocumentTextIcon className="w-6 h-6 mr-3 text-primary-400" /> Meus Pedidos</h2>
              <div className="overflow-x-auto bg-slate-800/50 rounded-lg border border-slate-700">
                <table className="min-w-full divide-y divide-slate-700">
                  <thead className="bg-slate-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Plano</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {userOrders.length > 0 ? userOrders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-700/40 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{order.sitePlan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">R$ {order.totalPrice.toFixed(2).replace('.', ',')}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={order.status} /></td>
                      </tr>
                    )) : (
                      <tr><td colSpan={5} className="text-center py-10 text-slate-400">Você ainda não fez nenhum pedido.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Seção Zona de Perigo */}
            <section id="zona-de-perigo">
               <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center"><ExclamationTriangleIcon /> Zona de Perigo</h2>
               <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Excluir sua conta</h3>
                    <p className="text-slate-300 mt-2 max-w-xl">Esta ação é permanente e não pode ser desfeita. Todos os seus dados, incluindo histórico de pedidos, serão removidos para sempre.</p>
                  </div>
                  <button onClick={handleDeleteUser} className="mt-4 sm:mt-0 flex-shrink-0 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors">
                    Excluir Minha Conta Permanentemente
                  </button>
                </div>
              </div>
            </section>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;