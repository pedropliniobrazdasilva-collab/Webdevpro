import React from 'react';
import { ChartBarIcon, ShieldCheckIcon, GoogleIcon, UsersIcon, ClockIcon, CheckCircleIcon } from './icons/FeatureIcons';

const benefits = [
  {
    icon: <ChartBarIcon />,
    title: 'Mais Vendas e Credibilidade',
    description: 'Um site profissional aumenta a confiança do cliente e abre novos canais de venda.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Profissionalismo',
    description: 'Transmita uma imagem de autoridade e seriedade no seu mercado de atuação.',
  },
  {
    icon: <GoogleIcon />,
    title: 'Aparecer no Google',
    description: 'Seja encontrado por clientes que estão procurando ativamente por seus serviços.',
  },
  {
    icon: <UsersIcon />,
    title: 'Geração de Clientes',
    description: 'Capture leads e construa uma base de clientes de forma consistente e automática.',
  },
  {
    icon: <ClockIcon />,
    title: 'Funcionamento 24h',
    description: 'Sua empresa aberta e vendendo todos os dias, a qualquer hora.',
  },
  {
    icon: <CheckCircleIcon />,
    title: 'Vantagem Competitiva',
    description: 'Destaque-se da concorrência e posicione sua marca como líder no setor.',
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section id="beneficios" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Por que seu negócio <span className="text-primary-400">precisa</span> de um site?
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Um site é o seu vendedor digital incansável, trabalhando para fortalecer sua marca e atrair clientes 24/7.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="relative bg-slate-800 p-6 rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-600/20 text-primary-400 mb-4 transition-all duration-300 group-hover:bg-primary-500/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/30">
                        {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-slate-400">{benefit.description}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;