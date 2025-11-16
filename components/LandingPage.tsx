import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Header from './Header.tsx';
import HeroSection from './HeroSection.tsx';
import AboutSection from './AboutSection.tsx';
import BenefitsSection from './BenefitsSection.tsx';
import PricingSection from './PricingSection.tsx';
import HowItWorksSection from './HowItWorksSection.tsx';
import TestimonialsSection from './TestimonialsSection.tsx';
import ContactSection from './ContactSection.tsx';
import Footer from './Footer.tsx';
import FadeInSection from './FadeInSection.tsx';
import { Order } from '../data/mock-orders.ts';
import { User } from '../types/user.ts';

interface LandingPageProps {
  onAdminAccessClick: () => void;
  onAddOrder: (order: Order) => void;
  currentUser: User | null;
  onLogout: () => void;
  onSettingsClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  onAdminAccessClick, 
  onAddOrder, 
  currentUser, 
  onLogout,
  onSettingsClick
}) => {
  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  return (
    <>
      <Header 
        onAdminAccessClick={onAdminAccessClick}
        currentUser={currentUser}
        onLogout={onLogout}
        onSettingsClick={onSettingsClick}
      />
      <main>
        <FadeInSection><HeroSection /></FadeInSection>
        <FadeInSection><AboutSection /></FadeInSection>
        <FadeInSection><BenefitsSection /></FadeInSection>
        <FadeInSection><PricingSection /></FadeInSection>
        <FadeInSection><HowItWorksSection /></FadeInSection>
        <FadeInSection><TestimonialsSection /></FadeInSection>
        <FadeInSection>
          <ContactSection 
            onAddOrder={onAddOrder} 
            currentUser={currentUser}
          />
        </FadeInSection>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;