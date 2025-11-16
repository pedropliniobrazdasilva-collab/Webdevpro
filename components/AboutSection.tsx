import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-600 to-teal-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Mesa de trabalho de um desenvolvedor com um laptop exibindo código, mostrando um ambiente de desenvolvimento focado." 
                className="rounded-lg shadow-2xl z-10 relative"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-4 -left-4 w-1/2 h-1/2 border-l-4 border-b-4 border-primary-400 rounded-bl-lg z-20 transition-all duration-300 group-hover:w-full group-hover:h-full"></div>
               <div className="absolute -top-4 -right-4 w-1/2 h-1/2 border-t-4 border-r-4 border-teal-400 rounded-tr-lg z-20 transition-all duration-300 group-hover:w-full group-hover:h-full"></div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Desenvolvimento Focado em Resultados
            </h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Como desenvolvedor freelancer, minha missão é criar mais do que apenas sites bonitos. Eu construo plataformas digitais que funcionam como uma poderosa ferramenta de negócios. Cada linha de código é escrita com foco em performance, usabilidade e, acima de tudo, conversão.
            </p>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Ofereço um serviço transparente e colaborativo, garantindo que o resultado final não apenas atenda, mas supere suas expectativas. Com experiência em tecnologias modernas, entrego projetos com rapidez, código limpo e um suporte dedicado para garantir seu sucesso contínuo.
            </p>
            <a href="#planos" className="text-primary-400 font-semibold hover:text-primary-300 transition duration-300 group">
              Conheça meus planos <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;