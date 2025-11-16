import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types/user';

interface HeaderProps {
  onAdminAccessClick: () => void;
  currentUser: User | null;
  onLogout: () => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminAccessClick, currentUser, onLogout, onSettingsClick }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Closes the mobile menu when a smooth scroll navigation is triggered
  useEffect(() => {
    const handleLinkClick = () => {
        setTimeout(() => setMobileMenuOpen(false), 100);
    };
    
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleLinkClick));
    
    return () => {
        links.forEach(link => link.removeEventListener('click', handleLinkClick));
    };
  }, [isMobileMenuOpen]);

  // Closes profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const navLinks = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#beneficios', label: 'Benefícios' },
    { href: '#planos', label: 'Planos' },
    { href: '#contato', label: 'Contato' },
  ];

  const LoggedInContent = () => (
    <div className="hidden md:flex items-center gap-4 relative" ref={profileMenuRef}>
        <button 
          onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
        >
          <span>Bem-vindo,</span> 
          <span className="font-bold text-white">{currentUser?.username}</span>
          <svg className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        {isProfileMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1 border border-slate-700 z-50">
            <button
              onClick={() => { onSettingsClick(); setProfileMenuOpen(false); }}
              className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Minha Conta
            </button>
            <button
              onClick={() => { onLogout(); setProfileMenuOpen(false); }}
              className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Sair
            </button>
          </div>
        )}
    </div>
  );


  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-white">
              WebDev<span className="text-primary-500">Pro</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <LoggedInContent />

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-slate-700 my-3 mx-2"></div>
              <>
                 <span className="text-slate-300 block px-3 py-2 text-base font-medium">Olá, {currentUser?.username}</span>
                  <button onClick={() => { onSettingsClick(); setMobileMenuOpen(false); }} className="w-full text-left text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Minha Conta
                  </button>
                 <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full text-left text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Sair
                  </button>
              </>
             <div className="border-t border-slate-700 my-3 mx-2"></div>
              <button
                onClick={() => {
                  onAdminAccessClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 text-left text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Acesso ADM
              </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;