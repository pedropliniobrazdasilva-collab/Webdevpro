import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    siteType: '',
    budget: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isCustomBudget, setIsCustomBudget] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would typically send the data to a server or email service
    setSubmitted(true);
    setFormData({
      name: '',
      whatsapp: '',
      siteType: '',
      budget: '',
      message: '',
    });
    setIsCustomBudget(false); // Reset custom budget view
    setTimeout(() => setSubmitted(false), 5000);
  };
  
  const inputStyles = "w-full bg-slate-700/50 border-2 border-slate-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200";

  return (
    <section id="contato" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Vamos começar seu projeto?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Preencha o formulário abaixo e receba um orçamento personalizado sem compromisso.
            </p>
          </div>
          
          {submitted && (
             <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">Obrigado!</strong>
                <span className="block sm:inline"> Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg shadow-2xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputStyles}
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-300 mb-2">WhatsApp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  placeholder="(XX) XXXXX-XXXX"
                  className={inputStyles}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
               <div>
                  <label htmlFor="siteType" className="block text-sm font-medium text-slate-300 mb-2">Tipo de site desejado</label>
                  <select
                     name="siteType"
                     id="siteType"
                     value={formData.siteType}
                     onChange={handleChange}
                     className={inputStyles}
                  >
                     <option value="">Selecione uma opção</option>
                     <option value="basico">Plano Básico</option>
                     <option value="intermediario">Plano Intermediário</option>
                     <option value="avancado">Plano Avançado</option>
                     <option value="outro">Outro (descrever na mensagem)</option>
                  </select>
               </div>
               <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">Orçamento aproximado</label>
                  {isCustomBudget ? (
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">R$</span>
                       <input
                         type="number"
                         name="budget"
                         id="budget"
                         value={formData.budget}
                         onChange={handleChange}
                         placeholder="Ex: 800"
                         className={`${inputStyles} pl-9`}
                       />
                    </div>
                  ) : (
                    <select
                       name="budget"
                       id="budget"
                       value={formData.budget}
                       onChange={handleChange}
                       className={inputStyles}
                    >
                       <option value="">Selecione uma faixa de valor</option>
                       <option value="ate-200">Até R$200</option>
                       <option value="201-400">R$201 - R$400</option>
                       <option value="401-700">R$401 - R$700</option>
                       <option value="acima-700">Acima de R$700</option>
                    </select>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomBudget(!isCustomBudget);
                      setFormData(prev => ({ ...prev, budget: '' }));
                    }}
                    className="text-xs text-primary-400 hover:text-primary-300 mt-2 text-left w-full transition-colors"
                  >
                    {isCustomBudget ? 'Escolher uma faixa de valor' : 'Definir valor personalizado'}
                  </button>
               </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Mensagem</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Conte um pouco sobre seu projeto, o que você precisa, etc."
                className={inputStyles}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/30"
              >
                Enviar Solicitação
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;