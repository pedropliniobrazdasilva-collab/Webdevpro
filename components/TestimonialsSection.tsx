import React from 'react';

const testimonials = [
  {
    name: 'Mariana S. de Almeida',
    role: 'Dona de Loja Online',
    quote: 'O trabalho foi impecável! O site ficou rápido, bonito e minhas vendas aumentaram logo no primeiro mês. Profissionalismo e agilidade do início ao fim.',
    image: 'https://picsum.photos/seed/female1/100/100',
  },
  {
    name: 'João Pereira',
    role: 'Consultor Financeiro',
    quote: 'Precisava de um site para passar mais credibilidade e o resultado foi fantástico. O design ficou super profissional e o processo foi muito tranquilo. Recomendo!',
    image: 'https://picsum.photos/seed/male1/100/100',
  },
  {
    name: 'Clínica Sorriso+',
    role: 'Clínica Odontológica',
    quote: 'Estamos muito satisfeitos! O formulário de contato e o agendamento via WhatsApp facilitaram muito nosso dia a dia. Excelente atendimento e suporte.',
    image: 'https://picsum.photos/seed/company1/100/100',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            O que meus clientes dizem
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            A satisfação de quem confia no meu trabalho é minha maior recompensa.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative bg-slate-900 p-8 rounded-lg shadow-lg flex flex-col border border-slate-700/50">
               <svg className="absolute top-6 left-6 w-12 h-12 text-slate-700" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.333 7h-2.667c-1.473 0-2.667 1.193-2.667 2.667v8c0 1.473 1.194 2.667 2.667 2.667h5.333c0-2.21-1.79-4-4-4v-5.333c.883 0 1.333-.447 1.333-1.333 0-.887-.45-1.333-1.333-1.333zM25.333 7h-2.667c-1.473 0-2.667 1.193-2.667 2.667v8c0 1.473 1.194 2.667 2.667 2.667h5.333c0-2.21-1.79-4-4-4v-5.333c.883 0 1.333-.447 1.333-1.333 0-.887-.45-1.333-1.333-1.333z" />
              </svg>
              <div className="flex-grow mb-4 pt-10">
                <p className="text-slate-300 italic relative z-10">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center mt-auto border-t border-slate-700 pt-6">
                <img className="w-12 h-12 rounded-full mr-4" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-primary-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;