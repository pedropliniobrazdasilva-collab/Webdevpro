import React from 'react';

const pricingPlans = [
  {
    name: 'Site Básico',
    price: '55,80',
    description: 'Presença online essencial.',
    features: [
      'Site de até 3 páginas',
      'Design limpo e responsivo',
      'Botão para WhatsApp',
      'Entrega rápida (1-3 dias)',
      'Suporte básico',
    ],
    highlight: false,
  },
  {
    name: 'Site Intermediário',
    price: '89,90',
    description: 'Ideal para pequenas empresas.',
    features: [
      'Site de 4 a 6 páginas',
      'Design profissional e moderno',
      'Otimização para Google (SEO)',
      'Formulário de contato',
      'Integração com WhatsApp',
      'Suporte por 15 dias',
    ],
    highlight: true,
  },
  {
    name: 'Site Avançado',
    price: '110,00',
    description: 'Solução completa para crescer.',
    features: [
      'Site completo e profissional',
      'Landing pages de conversão',
      'SEO avançado e contínuo',
      'Integração com IA (opcional)',
      'Blog integrado',
      'Google Analytics',
      'Suporte por 30 dias',
    ],
    highlight: false,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section id="planos" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Planos que se adaptam ao seu negócio
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Escolha o plano ideal para sua necessidade e orçamento. Preços acessíveis para um serviço profissional.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => {
            const cardClassName = plan.highlight
              ? 'relative flex flex-col bg-slate-900 rounded-lg p-8 transition-all duration-300 group border-2 border-primary-500 animate-pulse-glow'
              : 'relative flex flex-col bg-slate-900 rounded-lg shadow-xl p-8 transition-all duration-300 group border-2 border-slate-800 hover:border-primary-500/50';
            
            const buttonClassName = plan.highlight
              ? 'w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/30'
              : 'w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-slate-700 text-white hover:bg-primary-500';

            return (
              <div key={index} className={cardClassName}>
                {plan.highlight && (
                   <>
                      <div className="absolute -top-px left-20 right-20 h-px bg-gradient-to-r from-primary-500/0 via-primary-500/70 to-primary-500/0"></div>
                      <div className="absolute -bottom-px left-20 right-20 h-px bg-gradient-to-r from-primary-500/0 via-primary-500/70 to-primary-500/0"></div>
                      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                          <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                              MAIS POPULAR
                          </span>
                      </div>
                  </>
                )}
                <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-6 flex-grow">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white">R${plan.price}</span>
                  <span className="text-slate-400"> / único</span>
                </div>
                <ul className="space-y-4 mb-8 text-slate-300 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contato"
                  className={buttonClassName}
                >
                  Solicitar Orçamento
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;