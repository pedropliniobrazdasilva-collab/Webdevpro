import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Order } from '../../data/mock-orders.ts';

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
}

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


const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onViewDetails, onUpdateStatus, onDeleteOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  // Use a ref to store references to both the button and the menu wrapper for robust outside click detection
  const menuRefs = useRef<{ [key: string]: { wrapper: HTMLDivElement | null, button: HTMLButtonElement | null } }>({});
  
  const statusOrder: Record<Order['status'], number> = {
    'Aguardando Confirmação': 1,
    'Pendente': 2,
    'Em produção': 3,
    'Concluído': 4,
    'Cancelado': 5,
  };
  
  // A more robust effect to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openMenuId) return;

      const menu = menuRefs.current[openMenuId];
      // Close menu if the click is outside both the button and the menu panel itself
      if (menu && menu.wrapper && !menu.wrapper.contains(event.target as Node) && menu.button && !menu.button.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);


  const sortedAndFilteredOrders = useMemo(() => {
    let filteredOrders = [...orders];

    // Filter by status
    if (statusFilter !== 'Todos') {
      filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }

    // Filter by search term (ID, Customer Name or Username)
    if (searchTerm) {
      filteredOrders = filteredOrders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Custom Sort by Status, then by Date
    filteredOrders.sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return filteredOrders;
  }, [orders, searchTerm, statusFilter]);
  
  const tableHeaderClasses = "px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider";

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Todos os Pedidos</h2>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por ID, nome ou usuário..."
          className="flex-grow bg-slate-700/50 border-2 border-slate-600 rounded-md py-2 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-slate-700/50 border-2 border-slate-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Todos">Todos os Status</option>
          <option value="Aguardando Confirmação">Aguardando Confirmação</option>
          <option value="Pendente">Pendente</option>
          <option value="Em produção">Em produção</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900/50">
            <tr>
              <th className={tableHeaderClasses}>ID do Pedido</th>
              <th className={tableHeaderClasses}>Cliente</th>
              <th className={tableHeaderClasses}>Usuário</th>
              <th className={tableHeaderClasses}>Data</th>
              <th className={tableHeaderClasses}>Valor Total</th>
              <th className={tableHeaderClasses}>Status</th>
              <th className={`${tableHeaderClasses} text-center`}>Ações</th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {sortedAndFilteredOrders.length > 0 ? sortedAndFilteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-slate-700/50 transition-colors relative">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{order.customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-mono">{order.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">R$ {order.totalPrice.toFixed(2).replace('.', ',')}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={order.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                  <button
                     ref={el => {
                      if (!menuRefs.current[order.id]) menuRefs.current[order.id] = { wrapper: null, button: null };
                      menuRefs.current[order.id].button = el;
                    }}
                    onClick={() => {
                      setOpenMenuId(openMenuId === order.id ? null : order.id);
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-haspopup="true"
                    aria-expanded={openMenuId === order.id}
                  >
                    <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  </button>

                  {openMenuId === order.id && (
                    <div
                      ref={el => {
                        if (!menuRefs.current[order.id]) menuRefs.current[order.id] = { wrapper: null, button: null };
                        menuRefs.current[order.id].wrapper = el;
                      }}
                      className="absolute right-0 top-full mt-2 w-56 bg-slate-700 border border-slate-600 rounded-md shadow-lg z-20 origin-top-right"
                    >
                      <div className="py-1">
                        <button onClick={() => { onViewDetails(order); setOpenMenuId(null); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-primary-500 hover:text-white transition-colors rounded-t-md">
                          <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          Ver Detalhes
                        </button>
                        <div className="border-t border-slate-600 my-1"></div>
                        <span className="block px-4 pt-1 pb-1 text-xs font-bold text-slate-400 uppercase">Alterar Status</span>
                        {(Object.keys(statusOrder) as Array<Order['status']>).map(status => (
                            order.status !== status && (
                              <button key={status} onClick={() => { onUpdateStatus(order.id, status); setOpenMenuId(null); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 hover:text-white transition-colors">
                                <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: StatusBadge({ status }).props.className.match(/bg-([a-z]+)-[0-9]+\/80|bg-slate-600/)?.[0].replace('/80', '') }}></span>
                                {status}
                              </button>
                            )
                        ))}
                        <div className="border-t border-slate-600 my-1"></div>
                        <button onClick={() => { onDeleteOrder(order.id); setOpenMenuId(null); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition-colors rounded-b-md">
                          <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          Excluir Pedido
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400">
                  Nenhum pedido encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;