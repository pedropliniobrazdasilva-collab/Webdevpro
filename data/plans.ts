// data/plans.ts

export const sitePlans = [
  { id: 'basico', name: 'Site Básico' as const, price: 55.80, description: 'O ponto de partida perfeito para marcar sua presença digital com um site limpo, profissional e direto ao ponto.', recommended: false },
  { id: 'intermediario', name: 'Site Intermediário' as const, price: 89.90, description: 'Ideal para negócios em crescimento que buscam mais páginas, visibilidade no Google e ferramentas para captar clientes.', recommended: true },
  { id: 'avancado', name: 'Site Avançado' as const, price: 110.00, description: 'A solução definitiva para empresas que exigem máxima performance, SEO avançado e funcionalidades completas para escalar.', recommended: false },
];

export const hostingOptions = [
  { id: 'basica', name: 'Hospedagem Básica' as const, price: 5.90, description: 'Garante estabilidade para sites institucionais e portfólios com tráfego inicial. O melhor custo-benefício para começar.', recommended: false },
  { id: 'intermediaria', name: 'Hospedagem Intermediária' as const, price: 25.50, description: 'O equilíbrio ideal entre performance e custo. Carregamento rápido para sites com tráfego moderado e lojas virtuais.', recommended: true },
  { id: 'avancada', name: 'Hospedagem Avançada' as const, price: 52.49, description: 'Performance máxima para e-commerces e sites com alto volume de acessos. Garante velocidade e estabilidade sob qualquer demanda.', recommended: false },
];

// Helper for easy price lookup in other components
export const planPrices = {
  'Site Básico': 55.80,
  'Site Intermediário': 89.90,
  'Site Avançado': 110.00,
};

export const hostingPrices = {
  'Hospedagem Básica': 5.90,
  'Hospedagem Intermediária': 25.50,
  'Hospedagem Avançada': 52.49,
};
