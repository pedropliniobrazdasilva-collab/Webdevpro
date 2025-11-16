import React, { useState, useMemo } from 'react';

// Data for the wizard steps
const sitePlans = [
  { id: 'basico', name: 'Site Básico', price: 55.80, description: 'O ponto de partida perfeito para marcar sua presença digital com um site limpo, profissional e direto ao ponto.', recommended: false },
  { id: 'intermediario', name: 'Site Intermediário', price: 89.90, description: 'Ideal para negócios em crescimento que buscam mais páginas, visibilidade no Google e ferramentas para captar clientes.', recommended: true },
  { id: 'avancado', name: 'Site Avançado', price: 110.00, description: 'A solução definitiva para empresas que exigem máxima performance, SEO avançado e funcionalidades completas para escalar.', recommended: false },
];

const hostingOptions = [
  { id: 'basica', name: 'Hospedagem Básica', price: 5.90, description: 'Garante estabilidade para sites institucionais e portfólios com tráfego inicial. O melhor custo-benefício para começar.', recommended: false },
  { id: 'intermediaria', name: 'Hospedagem Intermediária', price: 25.50, description: 'O equilíbrio ideal entre performance e custo. Carregamento rápido para sites com tráfego moderado e lojas virtuais.', recommended: true },
  { id: 'avancada', name: 'Hospedagem Avançada', price: 52.49, description: 'Performance máxima para e-commerces e sites com alto volume de acessos. Garante velocidade e estabilidade sob qualquer demanda.', recommended: false },
];

const stepsInfo = ['Tipo de Site', 'Hospedagem', 'Seus Dados', 'Revisão'];

const ContactSection: React.FC = () => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState<{plan: {id: string, name: string, price: number} | null, hosting: {id: string, name: string, price: number} | null}>({
        plan: null,
        hosting: null,
    });
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        whatsapp: '',
    });
    const [errors, setErrors] = useState({ email: '', whatsapp: '' });
    
    const [isExiting, setIsExiting] = useState(false);

    const totalPrice = useMemo(() => {
        const planPrice = selections.plan?.price || 0;
        const hostingPrice = selections.hosting?.price || 0;
        return planPrice + hostingPrice;
    }, [selections]);

    const handleNext = () => {
        setIsExiting(true);
        setTimeout(() => {
            setStep(prev => prev + 1);
            setIsExiting(false);
        }, 300);
    };

    const handleBack = () => {
        setIsExiting(true);
        setTimeout(() => {
            setStep(prev => {
                const newStep = prev - 1;
                // Ao voltar para o passo 1, limpa a seleção de hospedagem
                // para que o "Total Parcial" seja recalculado corretamente.
                if (newStep === 1) {
                    setSelections(s => ({ ...s, hosting: null }));
                }
                return newStep;
            });
            setIsExiting(false);
        }, 300);
    };

    const formatWhatsapp = (value: string) => {
        const rawValue = value.replace(/\D/g, '');
        let maskedValue = '';
        if (rawValue.length > 0) {
            maskedValue = '(' + rawValue.substring(0, 2);
        }
        if (rawValue.length > 2) {
            maskedValue += ') ' + rawValue.substring(2, 7);
        }
        if (rawValue.length > 7) {
            maskedValue += '-' + rawValue.substring(7, 11);
        }
        return maskedValue.substring(0, 15); // Limit length: (XX) XXXXX-XXXX
    };

    const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'whatsapp') {
            const maskedValue = formatWhatsapp(value);
            setUserInfo(prev => ({ ...prev, whatsapp: maskedValue }));
        } else {
            setUserInfo(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const validateField = (name: string, value: string) => {
        if (name === 'email') {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!value) {
                setErrors(prev => ({ ...prev, email: 'E-mail é obrigatório.' }));
            } else if (!emailRegex.test(value)) {
                setErrors(prev => ({ ...prev, email: 'Formato de e-mail inválido.' }));
            } else {
                setErrors(prev => ({ ...prev, email: '' }));
            }
        }
        if (name === 'whatsapp') {
            const unmasked = value.replace(/\D/g, '');
            if (!value) {
                setErrors(prev => ({ ...prev, whatsapp: 'WhatsApp é obrigatório.' }));
            } else if (unmasked.length < 10) {
                setErrors(prev => ({ ...prev, whatsapp: 'Número inválido. Inclua o DDD.' }));
            } else {
                setErrors(prev => ({ ...prev, whatsapp: '' }));
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const isStep1Valid = selections.plan !== null;
    const isStep2Valid = selections.hosting !== null;

    const isStep3Valid = useMemo(() => {
        const isNameValid = userInfo.firstName && userInfo.lastName;
        const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email);
        const unmaskedWhatsapp = userInfo.whatsapp.replace(/\D/g, '');
        const isWhatsappValid = unmaskedWhatsapp.length >= 10 && unmaskedWhatsapp.length <= 11;
        return isNameValid && isEmailValid && isWhatsappValid;
    }, [userInfo]);

    const stepContainerClass = isExiting 
        ? 'transition-all duration-300 ease-in-out opacity-0 transform translate-x-4' 
        : 'transition-all duration-300 ease-in-out opacity-100 transform translate-x-0';
    
    const ProgressBar = () => (
        <div className="w-full max-w-xl mx-auto mb-16">
            <div className="relative">
                <div className="absolute top-5 left-0 w-full h-1 bg-slate-700 transform -translate-y-1/2"></div>
                <div 
                    className="absolute top-5 left-0 h-1 bg-primary-500 transform -translate-y-1/2 transition-all duration-500" 
                    style={{ width: `${((step - 1) / (stepsInfo.length - 1)) * 100}%` }}
                ></div>
                <div className="flex items-start justify-between">
                    {stepsInfo.map((name, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = step > stepNumber;
                        const isActive = step === stepNumber;
                        return (
                            <div key={name} className="relative z-10 flex flex-col items-center w-24">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${isCompleted ? 'bg-primary-500 text-white' : isActive ? 'bg-primary-500/30 border-2 border-primary-500 text-primary-300 transform scale-110 shadow-lg shadow-primary-500/20' : 'bg-slate-800 border-2 border-slate-700 text-slate-400'}`}>
                                    {isCompleted ? (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : stepNumber}
                                </div>
                                <p className={`mt-2 text-xs md:text-sm text-center font-semibold transition-all duration-300 ${isActive || isCompleted ? 'text-white' : 'text-slate-400'}`}>{name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className={stepContainerClass}>
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Passo 1: Escolha o Tipo de Site</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                           {sitePlans.map(plan => {
                                const isSelected = selections.plan?.id === plan.id;
                                const itemClass = `relative flex flex-col justify-between min-h-[190px] p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                                    isSelected 
                                        ? 'bg-primary-500/10 border-primary-500 shadow-lg shadow-primary-500/10' 
                                        : 'bg-slate-800 border-slate-700 hover:border-primary-500/50'
                                }`;
                                return (
                                    <div key={plan.id} onClick={() => setSelections(prev => ({...prev, plan}))} className={itemClass}>
                                        {plan.recommended && <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">MAIS POPULAR</span>}
                                        <div className={plan.recommended ? 'pt-4' : ''}>
                                            <h4 className="text-xl font-semibold text-white">{plan.name}</h4>
                                            <p className="text-slate-400 text-sm mt-1 mb-4 flex-grow">{plan.description}</p>
                                        </div>
                                        <p className="text-3xl font-bold text-white">R$ {plan.price.toFixed(2).replace('.', ',')}</p>
                                        {isSelected && (
                                            <div className="absolute top-4 right-4 h-6 w-6 bg-primary-500 rounded-full flex items-center justify-center text-white">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            case 2:
                return (
                     <div className={stepContainerClass}>
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Passo 2: Selecione a Hospedagem</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {hostingOptions.map(option => {
                                const isSelected = selections.hosting?.id === option.id;
                                const itemClass = `relative flex flex-col justify-between min-h-[190px] p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                                    isSelected 
                                        ? 'bg-primary-500/10 border-primary-500 shadow-lg shadow-primary-500/10' 
                                        : 'bg-slate-800 border-slate-700 hover:border-primary-500/50'
                                }`;
                                return (
                                    <div key={option.id} onClick={() => setSelections(prev => ({...prev, hosting: option}))} className={itemClass}>
                                        {option.recommended && <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">MAIS POPULAR</span>}
                                        <div className="pt-4">
                                            <h4 className="text-xl font-semibold text-white">{option.name}</h4>
                                            <p className="text-slate-400 text-sm mt-1 mb-4 flex-grow">{option.description}</p>
                                        </div>
                                        <p className="text-3xl font-bold text-white">R$ {option.price.toFixed(2).replace('.', ',')}</p>
                                        {isSelected && (
                                            <div className="absolute top-4 right-4 h-6 w-6 bg-primary-500 rounded-full flex items-center justify-center text-white">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            case 3:
                const inputStyles = "w-full bg-slate-700/50 border-2 border-slate-600 rounded-md py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200";
                return (
                     <div className={stepContainerClass}>
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Passo 3: Suas Informações</h3>
                        <div className="max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                             <div className="sm:col-span-1"><input type="text" name="firstName" placeholder="Primeiro nome" value={userInfo.firstName} onChange={handleUserInfoChange} required className={inputStyles} /></div>
                            <div className="sm:col-span-1"><input type="text" name="lastName" placeholder="Último nome" value={userInfo.lastName} onChange={handleUserInfoChange} required className={inputStyles} /></div>
                            <div className="sm:col-span-2">
                                <input type="email" name="email" placeholder="E-mail" value={userInfo.email} onChange={handleUserInfoChange} onBlur={handleBlur} required className={inputStyles} />
                                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                            </div>
                            <div className="sm:col-span-2">
                                <input type="tel" name="whatsapp" placeholder="WhatsApp (XX) XXXXX-XXXX" value={userInfo.whatsapp} onChange={handleUserInfoChange} onBlur={handleBlur} required className={inputStyles} />
                                {errors.whatsapp && <p className="text-red-400 text-xs mt-1 ml-1">{errors.whatsapp}</p>}
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className={stepContainerClass}>
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">Passo Final: Revise e Envie</h3>
                         <p className="text-center text-slate-400 mb-6 max-w-2xl mx-auto">Confira os detalhes e escolha seu método de contato preferido. Seu app de E-mail ou WhatsApp será aberto com a mensagem pronta.</p>
                        <div className="bg-slate-900/50 p-6 rounded-lg space-y-4 max-w-md mx-auto border border-slate-700">
                           <div className="flex justify-between items-center">
                                <span className="text-slate-300">Tipo de Site:</span>
                                <span className="font-semibold text-white text-right">{selections.plan?.name || 'N/A'}</span>
                           </div>
                           <div className="flex justify-between items-center">
                                <span className="text-slate-300">Hospedagem:</span>
                                <span className="font-semibold text-white text-right">{selections.hosting?.name || 'N/A'}</span>
                           </div>
                           <hr className="border-slate-700 my-3" />
                           <div className="flex justify-between items-center text-2xl">
                                <span className="text-slate-300">Valor Total:</span>
                                <span className="font-bold text-primary-400">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                           </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    }
    
    const requestSummary = `Olá, Equipe WebDevPro!

Gostaria de solicitar um orçamento com os seguintes detalhes:

*DADOS DO CLIENTE:*
- *Nome Completo:* ${userInfo.firstName} ${userInfo.lastName}
- *E-mail:* ${userInfo.email}
- *WhatsApp:* ${userInfo.whatsapp}

*DETALHES DO PEDIDO:*
- *Plano de Site:* ${selections.plan?.name} (R$ ${selections.plan?.price.toFixed(2).replace('.', ',')})
- *Plano de Hospedagem:* ${selections.hosting?.name} (R$ ${selections.hosting?.price.toFixed(2).replace('.', ',')})
- *Valor Total:* R$ ${totalPrice.toFixed(2).replace('.', ',')}

Aguardo o contato para alinharmos os próximos passos.

Atenciosamente,
${userInfo.firstName}`;

    const mailtoHref = `mailto:contato@webdevpro.com?subject=${encodeURIComponent(`Novo Pedido de Orçamento - ${userInfo.firstName} ${userInfo.lastName}`)}&body=${encodeURIComponent(requestSummary)}`;
    
    const whatsappPhoneNumber = '5511999999999'; 
    const whatsappHref = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(requestSummary)}`;


    const renderButtons = () => {
        const backButton = <button onClick={handleBack} className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5">Voltar</button>;
        const nextButton = (label: string, enabled: boolean) => <button onClick={handleNext} disabled={!enabled} className="w-full md:w-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30">{label}</button>;

        switch (step) {
            case 1:
                return <div className="flex justify-end">{nextButton('Avançar', isStep1Valid)}</div>;
            case 2:
                return <div className="flex justify-between w-full">{backButton}{nextButton('Avançar', isStep2Valid)}</div>;
            case 3:
                 return <div className="flex justify-between w-full">{backButton}{nextButton('Revisar', isStep3Valid)}</div>;
            case 4:
                return (
                     <div className="flex flex-col md:flex-row justify-between w-full gap-4 mt-6 max-w-2xl mx-auto">
                        {backButton}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459l-6.332 1.664zm5.826-2.029l.415.248c1.52 1.037 3.355 1.621 5.244 1.621 5.437 0 9.87-4.434 9.872-9.872.001-5.438-4.432-9.873-9.87-9.873-5.437 0-9.871 4.434-9.873 9.873-.001 2.012.58 3.927 1.696 5.611l.277.423-1.104 4.029 4.132-1.082z" /></svg>
                                Enviar por WhatsApp
                            </a>
                            <a href={mailtoHref} className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Enviar por E-mail
                            </a>
                        </div>
                    </div>
                );
        }
    }

    return (
        <section id="contato" className="py-20 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Vamos começar seu projeto?</h2>
                        <p className="mt-4 text-lg text-slate-300">Siga os passos abaixo para montar seu pedido personalizado.</p>
                    </div>

                    <div className="bg-slate-800 p-6 md:p-8 rounded-lg shadow-2xl min-h-[500px] flex flex-col">
                         <div className="flex-grow">
                            <ProgressBar />
                            <div className="min-h-[220px]">
                                {renderStep()}
                            </div>
                        </div>
                        <div className="mt-8">
                            {step >= 1 && step < 4 && (
                                <div className="text-center md:text-right text-slate-300 mb-4 pr-1">
                                    <span className="font-semibold">Total Parcial: </span>
                                    <span className="text-2xl font-bold text-primary-400">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                                </div>
                            )}
                            {renderButtons()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;