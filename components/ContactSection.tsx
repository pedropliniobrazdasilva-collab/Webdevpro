import React, { useState, useMemo } from 'react';
import { PixIcon } from './icons/PixIcon.tsx';
import { Order } from '../data/mock-orders.ts';
import { User } from '../types/user.ts';


// ★★★ CONFIGURAções DO FREELANCER ★★★
// Altere os valores abaixo para personalizar os dados de contato e pagamento.
const freelancerConfig = {
  // E-mail para onde os orçamentos e confirmações serão enviados.
  email: 'EquipeKirpo@gmail.com',
  
  // Número do WhatsApp no formato internacional (código do país + DDD + número). Ex: 5511987654321
  whatsappNumber: '5511915103290',
};

// Configuração PIX para Site Básico + Hospedagem Básica
const pixConfigBasic = {
  pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb30520400005303986540561.705802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304BA72',
  pixQrCodeUrl: 'https://i.postimg.cc/cHmTD7GK/IMG-20251116-WA0001.jpg'
};

// Configuração PIX para Site Básico + Hospedagem Intermediária
const pixConfigBasicIntermediate = {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb30520400005303986540581.305802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304B353',
    pixQrCodeUrl: 'https://i.postimg.cc/bwy6tF7n/IMG-20251116-WA0004.jpg'
};

// Configuração PIX para Site Básico + Hospedagem Avançada
const pixConfigBasicAdvanced = {
  pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406108.295802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***63040CC0',
  pixQrCodeUrl: 'https://i.postimg.cc/50GfTzVC/IMG-20251116-WA0005-2.jpg'
};

// Configuração PIX para Site Intermediário + Hospedagem Básica
const pixConfigIntermediateBasic = {
  pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb30520400005303986540595.805802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304E02C',
  pixQrCodeUrl: 'https://i.postimg.cc/q7LNxykj/IMG-20251116-WA0009.jpg'
};

// Configuração PIX para Site Intermediário + Hospedagem Intermediária
const pixConfigIntermediateIntermediate = {
  pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406115.405802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304CDC7',
  pixQrCodeUrl: 'https://i.postimg.cc/4NDPDkpP/IMG-20251116-WA0010.jpg'
};

// Configuração PIX para Site Intermediário + Hospedagem Avançada
const pixConfigIntermediateAdvanced = {
  pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406142.395802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304BB22',
  pixQrCodeUrl: 'https://i.postimg.cc/KvhS5VR8/IMG-20251116-WA0011.jpg'
};

// Configuração PIX para Site Avançado + Hospedagem Básica
const pixConfigAdvancedBasic = {
  pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406115.905802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304A7C9',
  pixQrCodeUrl: 'https://i.postimg.cc/G3yxk3Bg/IMG-20251116-WA0012.jpg'
};

// Configuração PIX para Site Avançado + Hospedagem Intermediária
const pixConfigAdvancedIntermediate = {
  pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406135.505802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304477D',
  pixQrCodeUrl: 'https://i.ibb.co/m5htxTTD/IMG-20251116-WA0013.jpg'
};

// Configuração PIX para Site Avançado + Hospedagem Avançada
const pixConfigAdvancedAdvanced = {
  pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406162.495802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***63043971',
  pixQrCodeUrl: 'https://i.ibb.co/jvVmgN03/IMG-20251116-WA0014.jpg'
};
// ★★★ FIM DAS CONFIGURAÇÕES ★★★


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

const stepsInfo = ['Site', 'Hospedagem', 'Dados', 'Revisão', 'Pagamento', 'Confirmação'];

interface ContactSectionProps {
  onAddOrder: (order: Order) => void;
  currentUser: User | null;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onAddOrder, currentUser }) => {
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
    const [confirmationType, setConfirmationType] = useState<'pix' | 'quote' | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);

    const totalPrice = useMemo(() => {
        const planPrice = selections.plan?.price || 0;
        const hostingPrice = selections.hosting?.price || 0;
        return planPrice + hostingPrice;
    }, [selections]);

    const isBasicPackage = useMemo(() => 
        selections.plan?.id === 'basico' && selections.hosting?.id === 'basica',
        [selections.plan, selections.hosting]
    );
    
    const isBasicIntermediatePackage = useMemo(() => 
        selections.plan?.id === 'basico' && selections.hosting?.id === 'intermediaria',
        [selections.plan, selections.hosting]
    );

    const isBasicAdvancedPackage = useMemo(() => 
        selections.plan?.id === 'basico' && selections.hosting?.id === 'avancada',
        [selections.plan, selections.hosting]
    );
    
    const isIntermediateBasicPackage = useMemo(() => 
        selections.plan?.id === 'intermediario' && selections.hosting?.id === 'basica',
        [selections.plan, selections.hosting]
    );

    const isIntermediateIntermediatePackage = useMemo(() => 
        selections.plan?.id === 'intermediario' && selections.hosting?.id === 'intermediaria',
        [selections.plan, selections.hosting]
    );

    const isIntermediateAdvancedPackage = useMemo(() => 
        selections.plan?.id === 'intermediario' && selections.hosting?.id === 'avancada',
        [selections.plan, selections.hosting]
    );

    const isAdvancedBasicPackage = useMemo(() => 
        selections.plan?.id === 'avancado' && selections.hosting?.id === 'basica',
        [selections.plan, selections.hosting]
    );

    const isAdvancedIntermediatePackage = useMemo(() => 
        selections.plan?.id === 'avancado' && selections.hosting?.id === 'intermediaria',
        [selections.plan, selections.hosting]
    );

    const isAdvancedAdvancedPackage = useMemo(() => 
        selections.plan?.id === 'avancado' && selections.hosting?.id === 'avancada',
        [selections.plan, selections.hosting]
    );

    const canPayWithPix = useMemo(() => isBasicPackage || isBasicIntermediatePackage || isBasicAdvancedPackage || isIntermediateBasicPackage || isIntermediateIntermediatePackage || isIntermediateAdvancedPackage || isAdvancedBasicPackage || isAdvancedIntermediatePackage || isAdvancedAdvancedPackage, [isBasicPackage, isBasicIntermediatePackage, isBasicAdvancedPackage, isIntermediateBasicPackage, isIntermediateIntermediatePackage, isIntermediateAdvancedPackage, isAdvancedBasicPackage, isAdvancedIntermediatePackage, isAdvancedAdvancedPackage]);

    const generateOrderId = (): string => {
        const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `WDP-${timestamp}-${randomPart}`;
    };

    const handleGoToStep = (targetStep: number) => {
        setIsExiting(true);
        setTimeout(() => {
            setStep(targetStep);
            setIsExiting(false);
        }, 300);
    };

    const handleNext = () => handleGoToStep(step + 1);
    const handleBack = () => handleGoToStep(step - 1);
    
    const handleReset = () => {
        setIsExiting(true);
        setTimeout(() => {
            setStep(1);
            setSelections({ plan: null, hosting: null });
            setUserInfo({ firstName: '', lastName: '', email: '', whatsapp: '' });
            setErrors({ email: '', whatsapp: '' });
            setConfirmationType(null);
            setOrderId(null);
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
        <div className="w-full max-w-3xl mx-auto mb-16">
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
                const step4Description = canPayWithPix
                    ? 'Confira os detalhes e escolha como deseja prosseguir. Você pode contratar o serviço agora com Pix ou solicitar um orçamento.' 
                    : 'Confira os detalhes e solicite um orçamento para prosseguir. O pagamento via Pix está disponível apenas para pacotes selecionados.';

                return (
                    <div className={stepContainerClass}>
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">Passo 4: Revise seu Pedido</h3>
                         <p className="text-center text-slate-400 mb-6 max-w-2xl mx-auto">{step4Description}</p>
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
                let pixDetails = null;
                if (isBasicPackage) pixDetails = pixConfigBasic;
                else if (isBasicIntermediatePackage) pixDetails = pixConfigBasicIntermediate;
                else if (isBasicAdvancedPackage) pixDetails = pixConfigBasicAdvanced;
                else if (isIntermediateBasicPackage) pixDetails = pixConfigIntermediateBasic;
                else if (isIntermediateIntermediatePackage) pixDetails = pixConfigIntermediateIntermediate;
                else if (isIntermediateAdvancedPackage) pixDetails = pixConfigIntermediateAdvanced;
                else if (isAdvancedBasicPackage) pixDetails = pixConfigAdvancedBasic;
                else if (isAdvancedIntermediatePackage) pixDetails = pixConfigAdvancedIntermediate;
                else if (isAdvancedAdvancedPackage) pixDetails = pixConfigAdvancedAdvanced;


                if (!pixDetails) return null; // Should not happen if logic is correct
                
                return (
                    <div className={stepContainerClass}>
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">Passo 5: Pague com Pix para Finalizar</h3>
                         <p className="text-center text-slate-400 mb-6 max-w-2xl mx-auto">Escaneie o QR Code ou use o Copia e Cola no app do seu banco. Após o pagamento, clique em "Já paguei" para confirmar.</p>
                        <div className="bg-slate-900/50 p-6 rounded-lg max-w-md mx-auto border border-slate-700 flex flex-col items-center">
                           <div className="bg-white p-2 rounded-md">
                               <img src={pixDetails.pixQrCodeUrl} alt="QR Code para pagamento Pix" className="w-48 h-48"/>
                           </div>
                           <p className="text-sm text-slate-400 mt-4 text-center">Use a opção "Pix Copia e Cola"</p>
                           <div className="relative w-full mt-2">
                                <input type="text" readOnly value={pixDetails.pixKey} className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white text-sm truncate" />
                                <button onClick={() => handleCopy(pixDetails!.pixKey)} className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors">
                                   {copied ? 'Copiado!' : 'Copiar'}
                                </button>
                           </div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className={`${stepContainerClass} text-center flex flex-col items-center`}>
                        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-500/20 mb-6">
                            <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">Obrigado!</h3>
                        {orderId && (
                            <div className="mb-4">
                                <p className="text-slate-400">Seu ID de Pedido é:</p>
                                <p className="text-2xl font-bold text-primary-400 bg-slate-900/50 px-4 py-2 rounded-md inline-block tracking-wider">{orderId}</p>
                            </div>
                        )}
                        {confirmationType === 'pix' ? (
                            <p className="text-slate-300 max-w-lg mx-auto">
                                Seu pedido foi recebido! Nossa equipe irá confirmar o pagamento e entrará em contato com você através do e-mail <strong>{userInfo.email}</strong> ou WhatsApp em até 20 minutos para dar início ao seu projeto.
                            </p>
                        ) : (
                            <p className="text-slate-300 max-w-lg mx-auto">
                                Sua solicitação de orçamento foi enviada com sucesso. Entraremos em contato em breve através do seu e-mail ou WhatsApp para os próximos passos. Por favor, guarde seu ID de Pedido.
                            </p>
                        )}
                    </div>
                );
            default: return null;
        }
    }
    
    const renderButtons = () => {
        const backButton = (className = "") => <button onClick={handleBack} className={`w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${className}`}>Voltar</button>;
        const nextButton = (label: string, enabled: boolean) => <button onClick={handleNext} disabled={!enabled} className="w-full md:w-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30">{label}</button>;

        const createAndSubmitOrder = () => {
             const newOrderId = generateOrderId();
             setOrderId(newOrderId);

             const newOrder: Order = {
                id: newOrderId,
                username: currentUser!.username,
                customer: {
                    name: `${userInfo.firstName} ${userInfo.lastName}`,
                    email: userInfo.email,
                },
                sitePlan: selections.plan!.name as Order['sitePlan'],
                hostingPlan: selections.hosting!.name as Order['hostingPlan'],
                totalPrice: totalPrice,
                status: 'Aguardando Confirmação',
                date: new Date().toISOString(),
            };
            onAddOrder(newOrder);
            return newOrder;
        }

        switch (step) {
            case 1:
                return <div className="flex justify-end">{nextButton('Avançar', isStep1Valid)}</div>;
            case 2:
                return <div className="flex justify-between w-full">{backButton()}{nextButton('Avançar', isStep2Valid)}</div>;
            case 3:
                 return <div className="flex justify-between w-full">{backButton()}{nextButton('Revisar Pedido', isStep3Valid)}</div>;
            case 4:
                const handleQuoteRequest = (type: 'whatsapp' | 'email') => {
                    const newOrder = createAndSubmitOrder();
                    setConfirmationType('quote');

                    const requestSummary = `Olá!

Gostaria de solicitar um orçamento.

*ID DO PEDIDO:* ${newOrder.id}

*DADOS DO CLIENTE:*
- *Nome Completo:* ${newOrder.customer.name}
- *E-mail:* ${newOrder.customer.email}
- *WhatsApp:* ${userInfo.whatsapp}

*DETALHES DO PEDIDO:*
- *Plano de Site:* ${newOrder.sitePlan} (R$ ${sitePlans.find(p => p.name === newOrder.sitePlan)!.price.toFixed(2).replace('.', ',')})
- *Plano de Hospedagem:* ${newOrder.hostingPlan} (R$ ${hostingOptions.find(h => h.name === newOrder.hostingPlan)!.price.toFixed(2).replace('.', ',')})
- *Valor Total:* R$ ${newOrder.totalPrice.toFixed(2).replace('.', ',')}

Aguardo o contato para alinharmos os próximos passos.

Atenciosamente,
${userInfo.firstName}`;
                    
                    const mailtoHref = `mailto:${freelancerConfig.email}?subject=${encodeURIComponent(`Orçamento [${newOrder.id}] - ${newOrder.customer.name}`)}&body=${encodeURIComponent(requestSummary)}`;
                    const whatsappHref = `https://wa.me/${freelancerConfig.whatsappNumber}?text=${encodeURIComponent(requestSummary)}`;

                    const url = type === 'whatsapp' ? whatsappHref : mailtoHref;
                    window.open(url, '_blank', 'noopener,noreferrer');
                    handleGoToStep(6);
                };
                const handlePixPaymentStart = () => {
                    setConfirmationType('pix');
                    handleGoToStep(5);
                }

                return (
                     <div className="flex flex-col justify-between w-full gap-4 mt-8 max-w-3xl mx-auto">
                        <div className="flex items-center gap-4 flex-col md:flex-row">
                            {backButton("w-full md:w-auto")}
                            {canPayWithPix && (
                                <button onClick={handlePixPaymentStart} className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30">
                                    <PixIcon className="w-6 h-6" />
                                    Pagar com Pix
                                </button>
                            )}
                        </div>
                        {canPayWithPix && <div className="text-center text-slate-400 text-sm my-2">ou, se preferir</div>}
                         <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <button onClick={() => handleQuoteRequest('whatsapp')} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459l-6.332 1.664zm5.826-2.029l.415.248c1.52 1.037 3.355 1.621 5.244 1.621 5.437 0 9.87-4.434 9.872-9.872.001-5.438-4.432-9.873-9.87-9.873-5.437 0-9.871 4.434-9.873 9.873-.001 2.012.58 3.927 1.696 5.611l.277.423-1.104 4.029 4.132-1.082z" /></svg>
                                Solicitar Orçamento por WhatsApp
                            </button>
                            <button onClick={() => handleQuoteRequest('email')} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Solicitar Orçamento por E-mail
                            </button>
                        </div>
                    </div>
                );
            case 5:
                 const handleConfirmPayment = () => {
                    createAndSubmitOrder();
                    handleGoToStep(6);
                };
                return (
                    <div className="flex flex-col md:flex-row justify-between w-full gap-4 mt-8 max-w-3xl mx-auto">
                        {backButton()}
                         <button onClick={handleConfirmPayment} className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30">
                            Já Paguei, Confirmar Pedido
                        </button>
                    </div>
                );
            case 6:
                return (
                    <div className="flex justify-center w-full mt-8">
                        <button onClick={handleReset} className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30">
                            Fazer Novo Pedido
                        </button>
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
                        <p className="mt-4 text-lg text-slate-300">
                            Siga os passos abaixo para montar seu pedido personalizado.
                        </p>
                    </div>

                     <div className="bg-slate-800 p-4 md:p-8 rounded-lg shadow-2xl min-h-[550px] flex flex-col">
                        <div className="flex-grow">
                            <ProgressBar />
                            <div className="min-h-[250px] flex items-center justify-center">
                                {renderStep()}
                            </div>
                        </div>
                        <div className="mt-8">
                            {step < 4 && (
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