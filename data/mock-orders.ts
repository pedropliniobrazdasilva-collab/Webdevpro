export interface Order {
  id: string;
  username: string; // Adicionado para vincular ao usuário
  customer: {
    name: string;
    email: string;
  };
  sitePlan: 'Site Básico' | 'Site Intermediário' | 'Site Avançado';
  hostingPlan: 'Hospedagem Básica' | 'Hospedagem Intermediária' | 'Hospedagem Avançada';
  totalPrice: number;
  status: 'Aguardando Confirmação' | 'Pendente' | 'Em produção' | 'Concluído' | 'Cancelado';
  date: string;
  observations?: string;
}

// Mock data to demonstrate the new features
export const mockOrders: Order[] = [
    {
        id: 'WDP-K9L0-B3N7',
        username: 'carlos_a',
        customer: { name: 'Carlos Andrade', email: 'carlos.a@example.com' },
        sitePlan: 'Site Intermediário',
        hostingPlan: 'Hospedagem Intermediária',
        totalPrice: 115.40,
        status: 'Aguardando Confirmação',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        observations: 'Preciso de uma galeria de fotos integrada.',
    },
    {
        id: 'WDP-J4M1-P8Q2',
        username: 'beatriz_c',
        customer: { name: 'Beatriz Costa', email: 'beatriz.c@example.com' },
        sitePlan: 'Site Avançado',
        hostingPlan: 'Hospedagem Avançada',
        totalPrice: 162.49,
        status: 'Em produção',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'WDP-H7N5-R2S6',
        username: 'lucas_m',
        customer: { name: 'Lucas Martins', email: 'lucas.m@example.com' },
        sitePlan: 'Site Básico',
        hostingPlan: 'Hospedagem Básica',
        totalPrice: 61.70,
        status: 'Pendente',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'WDP-F2G8-T5V9',
        username: 'beatriz_c',
        customer: { name: 'Fernanda Lima', email: 'fernanda.l@example.com' },
        sitePlan: 'Site Intermediário',
        hostingPlan: 'Hospedagem Básica',
        totalPrice: 95.80,
        status: 'Concluído',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
     {
        id: 'WDP-D3C4-W1X7',
        username: 'ricardo_s',
        customer: { name: 'Ricardo Souza', email: 'ricardo.s@example.com' },
        sitePlan: 'Site Básico',
        hostingPlan: 'Hospedagem Intermediária',
        totalPrice: 81.30,
        status: 'Cancelado',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        observations: 'Cliente desistiu do projeto.',
    }
];