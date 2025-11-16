import React, { useState, useMemo } from 'react';
import { PixIcon } from './icons/PixIcon.tsx';


// ★★★ CONFIGURAÇÕES DO FREELANCER ★★★
// Altere os valores abaixo para personalizar os dados de contato e pagamento.
const freelancerConfig = {
  // E-mail para onde os orçamentos e confirmações serão enviados.
  email: 'seu-email-profissional@exemplo.com',
  
  // Número do WhatsApp no formato internacional (código do país + DDD + número). Ex: 5511987654321
  whatsappNumber: '5511987654321',
  
  // Chave PIX (Copia e Cola). Pode ser seu e-mail, telefone, CPF/CNPJ ou chave aleatória.
  pixKey: '123e4567-e89b-12d3-a456-426614174000',

  // URL da imagem do QR Code do Pix. Gere o seu em um site/app confiável e cole o link aqui.
  // O link de exemplo abaixo é apenas um placeholder.
  pixQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=CHAVE_PIX_AQUI'
};
// ★★★ FIM DAS CONFIGURAÇÕES ★★★

// ★★★ DADOS PIX ESPECÍFICOS PARA PLANO BÁSICO + HOSPEDAGEM BÁSICA ★★★
const specialPixQrCodeUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAAB0klEQVRIie2WsY6EMAxFfSBeQEVlV1dHp8bB4dBR2FkRUEGGQ+AgqKgoCI6AgwP2R5IkyVm2W+t7SSQG/uP9f0nbJImW6tQ5uI4tprqJtW3s+i5m1S2vj093l8t5vY87P/77vPz55DTe2wQ8Xp8S0b56p4vWcb7d0+aTADoH4IeG/nC0tQC2D0Q3pUoBvOQ2I14mY9nZ+A9q/gT81OtsgON9LUD20+Tu91uT3C2A9n93R2Qrt2A+2o8585DqADoe0380/u6n0k54mCsgfB/HrgBLDq74w1y3D0S3k5QA+P/8U4D+2zQAn5I2ADpG4/7G2D5Q/w34qU4vAN/j4ADoGIGuAXQOQPvPzW5/Vv8WqHc2wP7j/S1AGVAPgHp+N/8A7T92m8a/AdoPoLu/w9sB6v7fNIB1XwOQ6iQAnb8HhQCyB4B+AvBTAJ5MAHYPQOugHh3A9m+a/wB+apq/FSA7A6DtB+BfZtFvAPVf/X/3CuhAegDQATr+A36uAbQPoLcGgHoAegDotwDq/oA6AACdAwA6B0AHAHQA0AE6B0AHANABQAcAHQDsPQB+KgE6AAcA3R0A7R2A7g4AHQA6ADsA6AA6AGgA6ACgA2gA0AE6ABsA6ADoAGgA0AE6ADoA6ACgA6ADoANoANABAOgAgA4AOgDoADYAGA3A7YFk513Z2QPQAZAdADoA2QHQAUAHANABQAcAHQA6ALIDoAMgOwA6ADoA6ADoAKADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgOwA6AOgA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6ADoA6ACgA6ADoAOkA6ADkAsgO0A6aT+T0v4K58uLwBwOAL/gL+AVeJtHry3o/UAAAAASUVORK5CYII=';
const specialPixKey = '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb30520400005303986540561.705802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304BA72';
// ★★★ FIM DOS DADOS ESPECÍFICOS ★★★


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

const stepsInfo = ['Tipo de Site', 'Hospedagem', 'Seus Dados', 'Pagamento', 'Confirmação'];

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
    const [copied, setCopied] = useState(false);

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
            setStep(prev => prev - 1);
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
    
    const handleCopy = (key: string) => {
        navigator.clipboard.writeText(key).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
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
        <div className="w-full max-w-2xl mx-auto mb-16">
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
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">Passo 4: Revise e Pague</h3>
                         <p className="text-center text-slate-400 mb-6 max-w-2xl mx-auto">Confira os detalhes e escolha como deseja prosseguir. Você pode contratar o serviço agora com Pix ou solicitar um orçamento.</p>
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
             case 5:
                const isSpecialCase = selections.plan?.id === 'basico' && selections.hosting?.id === 'basica';
                const qrCodeUrl = isSpecialCase ? specialPixQrCodeUrl : freelancerConfig.pixQrCodeUrl;
                const pixKey = isSpecialCase ? specialPixKey : freelancerConfig.pixKey;
                
                return (
                    <div className={stepContainerClass}>
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">Passo Final: Pague com Pix para Finalizar</h3>
                         <p className="text-center text-slate-400 mb-6 max-w-2xl mx-auto">Escaneie o QR Code ou use o Copia e Cola no app do seu banco. Após o pagamento, seu pedido será confirmado.</p>
                        <div className="bg-slate-900/50 p-6 rounded-lg max-w-md mx-auto border border-slate-700 flex flex-col items-center">
                           <div className="bg-white p-2 rounded-md">
                               <img src={qrCodeUrl} alt="QR Code para pagamento Pix" className="w-48 h-48"/>
                           </div>
                           <p className="text-sm text-slate-400 mt-4 text-center">Use a opção "Pix Copia e Cola"</p>
                           <div className="relative w-full mt-2">
                                <input type="text" readOnly value={pixKey} className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white text-sm truncate" />
                                <button onClick={() => handleCopy(pixKey)} className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors">
                                   {copied ? 'Copiado!' : 'Copiar'}
                                </button>
                           </div>
                           {!isSpecialCase && (
                             <div className="text-xs text-amber-400/80 mt-4 p-2 bg-amber-500/10 rounded border border-amber-500/20 text-center">
                                 <strong>Atenção:</strong> Lembre-se de gerar seu próprio QR Code e atualizar a chave Pix nas configurações no topo deste arquivo.
                             </div>
                           )}
                        </div>
                    </div>
                );
            default: return null;
        }
    }
    
    const requestSummary = `Olá!

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

    const mailtoHref = `mailto:${freelancerConfig.email}?subject=${encodeURIComponent(`Novo Pedido de Orçamento - ${userInfo.firstName} ${userInfo.lastName}`)}&body=${encodeURIComponent(requestSummary)}`;
    
    const whatsappHref = `https://wa.me/${freelancerConfig.whatsappNumber}?text=${encodeURIComponent(requestSummary)}`;


    const renderButtons = () => {
        const backButton = (className = "") => <button onClick={handleBack} className={`w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${className}`}>Voltar</button>;
        const nextButton = (label: string, enabled: boolean) => <button onClick={handleNext} disabled={!enabled} className="w-full md:w-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30">{label}</button>;

        switch (step) {
            case 1:
                return <div className="flex justify-end">{nextButton('Avançar', isStep1Valid)}</div>;
            case 2:
                return <div className="flex justify-between w-full">{backButton()}{nextButton('Avançar', isStep2Valid)}</div>;
            case 3:
                 return <div className="flex justify-between w-full">{backButton()}{nextButton('Revisar e Pagar', isStep3Valid)}</div>;
            case 4:
                return (
                     <div className="flex flex-col justify-between w-full gap-4 mt-8 max-w-3xl mx-auto">
                        <div className="flex justify-between items-center gap-4">
                            {backButton()}
                            <button onClick={handleNext} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30">
                                <PixIcon className="w-6 h-6" />
                                Pagar com Pix
                            </button>
                        </div>
                        <div className="text-center text-slate-400 text-sm my-2">ou, se preferir</div>
                         <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459l-6.332 1.664zm5.826-2.029l.415.248c1.52 1.037 3.355 1.621 5.244 1.621 5.437 0 9.87-4.434 9.872-9.872.001-5.438-4.432-9.873-9.87-9.873-5.437 0-9.871 4.434-9.873 9.873-.001 2.012.58 3.927 1.696 5.611l.277.423-1.104 4.029 4.132-1.082z" /></svg>
                                Solicitar Orçamento por WhatsApp
                            </a>
                            <a href={mailtoHref} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Solicitar Orçamento por E-mail
                            </a>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="flex flex-col justify-between w-full gap-4 mt-8 max-w-3xl mx-auto">
                        <div className="flex justify-between items-center gap-4">
                            {backButton()}
                             <a href={mailtoHref} className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30">
                                Já Paguei, Confirmar Pedido
                            </a>
                        </div>
                    </div>
                );
        }
    }

    return (
        <section id="contato" className="py-20 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Vamos começar seu projeto?</h2>
                        <p className="mt-4 text-lg text-slate-300">Siga os passos abaixo para montar seu pedido personalizado.</p>
                    </div>

                    <div className="bg-slate-800 p-4 md:p-8 rounded-lg shadow-2xl min-h-[550px] flex flex-col">
                         <div className="flex-grow">
                            <ProgressBar />
                            <div className="min-h-[250px]">
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