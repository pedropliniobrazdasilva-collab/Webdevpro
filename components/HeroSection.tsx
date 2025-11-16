import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative py-20 md:py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              Transforme seu Negócio com um
              <span className="block text-primary-400">Site Profissional e Rápido</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto md:mx-0 mb-8">
              Crio sites modernos, responsivos e otimizados para converter visitantes em clientes, impulsionando suas vendas e fortalecendo sua marca.
            </p>
            <a
              href="#contato"
              className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-primary-500/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-primary-500/40"
            >
              Solicitar Orçamento
            </a>
          </div>
          <div className="relative group hidden md:block">
            <div className="absolute -inset-2.5 bg-gradient-to-r from-primary-600 to-teal-500 rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
            <img 
                src="https://as1.ftcdn.net/v2/jpg/01/14/25/44/1000_F_114254425_hUr9iN5LROKKf6mjlt0w2x2p2AGkQ53L.jpg" 
                alt="Mural com 'Business Plans' e uma seta de crescimento, simbolizando o crescimento de negócios." 
                className="relative rounded-lg shadow-2xl z-10 w-full"
                fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;