
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-center">
          <div>
            <p className="text-center text-base text-slate-400">
              &copy; {new Date().getFullYear()} WebDevPro. Todos os direitos reservados.
            </p>
             <p className="text-center text-xs text-slate-500 mt-2">
              Este é um site demonstrativo. Para solicitar um projeto, por favor utilize o formulário de contato.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;