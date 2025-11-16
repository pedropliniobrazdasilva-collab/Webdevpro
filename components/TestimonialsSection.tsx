import React from 'react';

const testimonials = [
  {
    name: 'Mariana S. de Almeida',
    role: 'Dona de Loja Online',
    quote: 'Desde o lançamento do novo e-commerce, nossa taxa de conversão aumentou em 30%. O design intuitivo e a velocidade de carregamento fizeram toda a diferença. Um investimento que se pagou em poucos meses!',
    image: 'https://picsum.photos/seed/female1/100/100',
    rating: 5,
  },
  {
    name: 'João Pereira',
    role: 'Consultor Financeiro',
    quote: 'Eu precisava de um site que transmitisse a seriedade do meu trabalho. O resultado foi uma plataforma elegante que me posicionou como autoridade e já me trouxe três novos clientes de alto valor.',
    image: 'https://picsum.photos/seed/male1/100/100',
    rating: 5,
  },
  {
    name: 'Clínica Sorriso+',
    role: 'Clínica Odontológica',
    quote: 'O novo site facilitou imensamente o agendamento de consultas. Recebemos feedback positivo dos pacientes sobre a facilidade de uso, e nossa recepção agora gasta menos tempo ao telefone. Otimização fantástica!',
    image: 'https://picsum.photos/seed/company1/100/100',
    rating: 5,
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-slate-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

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
            <div key={index} className="bg-slate-900 p-8 rounded-lg shadow-lg flex flex-col border border-slate-700/50">
               <svg className="absolute top-6 right-6 w-16 h-16 text-slate-800" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.333 7h-2.667c-1.473 0-2.667 1.193-2.667 2.667v8c0 1.473 1.194 2.667 2.667 2.667h5.333c0-2.21-1.79-4-4-4v-5.333c.883 0 1.333-.447 1.333-1.333 0-.887-.45-1.333-1.333-1.333zM25.333 7h-2.667c-1.473 0-2.667 1.193-2.667 2.667v8c0 1.473 1.194 2.667 2.667 2.667h5.333c0-2.21-1.79-4-4-4v-5.333c.883 0 1.333-.447 1.333-1.333 0-.887-.45-1.333-1.333-1.333z" />
              </svg>
              <div className="relative z-10">
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="text-slate-300 italic flex-grow">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center mt-6 border-t border-slate-700 pt-6">
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