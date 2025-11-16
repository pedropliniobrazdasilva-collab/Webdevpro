import React from 'react';
import { Order } from '../../data/mock-orders.ts';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
}

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-bold rounded-full text-white";
  const statusClasses: Record<Order['status'], string> = {
    'Aguardando Confirmação': "bg-yellow-500/80",
    Pendente: "bg-sky-500/80",
    'Em produção': "bg-blue-500/80",
    // FIX: Corrected typo from 'Conclúido' to 'Concluído' to match the type definition.
    Concluído: "bg-green-500/80",
    Cancelado: "bg-red-500/80",
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, isOpen, onClose, onUpdateStatus }) => {
  if (!isOpen || !order) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(order.id, e.target.value as Order['status']);
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Detalhes do Pedido #{order.id}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-primary-400 mb-2">Dados do Cliente</h3>
              <div className="space-y-2 text-slate-300">
                <p><strong>Nome:</strong> {order.customer.name}</p>
                <p><strong>E-mail:</strong> {order.customer.email}</p>
                <p><strong>Usuário:</strong> <span className="font-mono bg-slate-700/50 px-2 py-0.5 rounded text-sm">{order.username}</span></p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-400 mb-2">Resumo do Pedido</h3>
              <div className="space-y-2 text-slate-300">
                <p><strong>Data:</strong> {new Date(order.date).toLocaleDateString('pt-BR')}</p>
                <p><strong>Status Atual:</strong> <StatusBadge status={order.status} /></p>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-primary-400 mb-2">Itens Contratados</h3>
            <div className="bg-slate-900/50 rounded-lg p-4 divide-y divide-slate-700">
              <div className="flex justify-between py-2">
                <span className="text-slate-300">{order.sitePlan}</span>
                <span className="text-white font-medium">R$ {sitePlans[order.sitePlan].toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-300">{order.hostingPlan}</span>
                <span className="text-white font-medium">R$ {hostingPlans[order.hostingPlan].toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between pt-4 font-bold text-lg">
                <span className="text-primary-400">Total</span>
                <span className="text-primary-400">R$ {order.totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

          {/* Observations */}
          {order.observations && (
            <div>
                <h3 className="text-lg font-semibold text-primary-400 mb-2">Observações do Cliente</h3>
                <p className="text-slate-300 bg-slate-900/50 p-4 rounded-lg italic">"{order.observations}"</p>
            </div>
          )}

        </div>

        <div className="p-5 border-t border-slate-700 mt-auto bg-slate-800/50 rounded-b-lg flex flex-col sm:flex-row items-center justify-between gap-4">
           <div>
              <label htmlFor="status-update" className="text-sm font-medium text-slate-300 mr-2">Alterar Status:</label>
              <select 
                id="status-update"
                value={order.status} 
                onChange={handleStatusChange}
                className="bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Aguardando Confirmação">Aguardando Confirmação</option>
                <option value="Pendente">Pendente</option>
                <option value="Em produção">Em produção</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
           </div>
          <button 
            onClick={onClose} 
            className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const sitePlans = {
  'Site Básico': 55.80,
  'Site Intermediário': 89.90,
  'Site Avançado': 110.00,
};

const hostingPlans = {
  'Hospedagem Básica': 5.90,
  'Hospedagem Intermediária': 25.50,
  'Hospedagem Avançada': 52.49,
};

export default OrderDetailsModal;