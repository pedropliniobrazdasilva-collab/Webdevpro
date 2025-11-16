import React, { useState, useMemo } from 'react';
import StatCard from './admin/StatCard.tsx';
import OrdersTable from './admin/OrdersTable.tsx';
import OrderDetailsModal from './admin/OrderDetailsModal.tsx';
import { Order } from '../data/mock-orders.ts';
import { TotalOrdersIcon, PendingOrdersIcon, CompletedOrdersIcon, TotalRevenueIcon, RefreshIcon } from './icons/AdminIcons.tsx';

interface AdminPageProps {
  onGoBack: () => void;
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  onResetOrders: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onGoBack, orders, onUpdateStatus, onDeleteOrder, onResetOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pendente' || o.status === 'Aguardando Confirmação').length;
    const completedOrders = orders.filter(o => o.status === 'Concluído').length;
    const totalRevenue = orders.reduce((sum, o) => o.status === 'Concluído' ? sum + o.totalPrice : sum, 0);

    return { totalOrders, pendingOrders, completedOrders, totalRevenue };
  }, [orders]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatusInModal = (orderId: string, newStatus: Order['status']) => {
    onUpdateStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleDeleteOrderAndCloseModal = (orderId: string) => {
    if (selectedOrder && selectedOrder.id === orderId) {
      handleCloseModal();
    }
    onDeleteOrder(orderId);
  }
  
  const MainContent = () => (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard de Pedidos</h1>
          <p className="text-slate-400 mt-1">Visão geral dos pedidos e do faturamento.</p>
        </div>
        <button 
          onClick={onResetOrders}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <RefreshIcon />
          Restaurar Dados
        </button>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard title="Total de Pedidos" value={stats.totalOrders} icon={<TotalOrdersIcon />} colorClass="from-primary-500 to-teal-400" />
        <StatCard title="Pedidos Pendentes" value={stats.pendingOrders} icon={<PendingOrdersIcon />} colorClass="from-amber-500 to-orange-400" />
        <StatCard title="Pedidos Concluídos" value={stats.completedOrders} icon={<CompletedOrdersIcon />} colorClass="from-green-500 to-emerald-400" />
        <StatCard title="Faturamento Total" value={`R$ ${stats.totalRevenue.toFixed(2).replace('.', ',')}`} icon={<TotalRevenueIcon />} colorClass="from-sky-500 to-cyan-400" />
      </div>

      <OrdersTable 
        orders={orders} 
        onViewDetails={handleViewDetails}
        onUpdateStatus={onUpdateStatus}
        onDeleteOrder={handleDeleteOrderAndCloseModal}
      />
    </main>
  );

  return (
    <div className="flex h-screen bg-slate-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800/50 p-6 hidden md:flex flex-col flex-shrink-0 border-r border-slate-700/50">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-white">
              WebDev<span className="text-primary-500">Pro</span>
            </a>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        <nav className="mt-10 flex-grow">
          <a href="#" className="flex items-center px-4 py-3 bg-primary-500/20 text-primary-300 rounded-lg font-semibold">
             <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            Dashboard
          </a>
           {/* Add other nav links here */}
        </nav>
        <div className="flex-shrink-0 mt-auto">
           <button onClick={onGoBack} className="w-full flex items-center justify-center gap-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white px-4 py-3 rounded-lg font-semibold transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Voltar ao Site
            </button>
            <div className="border-t border-slate-700 my-4"></div>
            <p className="text-sm text-slate-300">Admin Logado</p>
            <p className="text-xs text-slate-500">admin@webdevpro.com</p>
        </div>
      </aside>
      
      <MainContent />

      <OrderDetailsModal 
        isOpen={isModalOpen}
        order={selectedOrder}
        onClose={handleCloseModal}
        onUpdateStatus={handleUpdateStatusInModal}
      />
    </div>
  );
};

export default AdminPage;