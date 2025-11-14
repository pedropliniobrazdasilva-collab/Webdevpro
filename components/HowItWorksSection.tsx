import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Briefing e Ideias',
    description: 'Você me conta sobre seu negócio e suas ideias. Juntos, definimos os objetivos do site.',
  },
  {
    number: '02',
    title: 'Design e Rascunho',
    description: 'Crio um rascunho visual (layout) para você ver como o site ficará. Nesta fase, a estrutura é definida.',
  },
  {
    number: '03',
    title: 'Desenvolvimento e Ajustes',
    description: 'Com o design aprovado, eu construo o site. Realizamos os ajustes finos até que tudo esteja 100% perfeito.',
  },
  {
    number: '04',
    title: 'Entrega Final e Suporte',
    description: 'Seu site é publicado e está pronto para o mundo! Ofereço o suporte combinado para garantir que tudo funcione bem.',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="como-funciona" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Como funciona o processo de criação?
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Um processo simples, transparente e focado em entregar o melhor resultado para você.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-4 h-[calc(100%-2rem)] w-px bg-slate-700 hidden md:block" aria-hidden="true"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="md:grid md:grid-cols-2 md:gap-x-12 items-center relative">
                <div className={`md:order-${index % 2 === 0 ? 1 : 2}`}>
                  <div className="bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700">
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                      <span className="text-primary-400 mr-3 text-2xl">{step.number}</span>
                      {step.title}
                    </h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </div>
                <div className={`md:order-${index % 2 === 0 ? 2 : 1} hidden md:flex items-center justify-center`}>
                    <div className="w-5 h-5 bg-primary-500 rounded-full shadow-lg shadow-primary-500/50 ring-4 ring-slate-900"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;