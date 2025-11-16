import React, { useEffect } from 'react';
import Header from './components/Header.tsx';
import HeroSection from './components/HeroSection.tsx';
import AboutSection from './components/AboutSection.tsx';
import BenefitsSection from './components/BenefitsSection.tsx';
import PricingSection from './components/PricingSection.tsx';
import HowItWorksSection from './components/HowItWorksSection.tsx';
import TestimonialsSection from './components/TestimonialsSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import Footer from './components/Footer.tsx';
import FadeInSection from './components/FadeInSection.tsx';

const App: React.FC = () => {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');
        e.preventDefault();

        if (href && href.length > 1) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            // Dispatch a custom event to notify other components (like the header)
            // that a navigation has occurred. This solves issues on mobile where
            // closing the menu interferes with the scroll animation.
            document.dispatchEvent(new CustomEvent('smoothscroll'));
          }
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <FadeInSection>
          <HeroSection />
        </FadeInSection>
        <FadeInSection>
          <AboutSection />
        </FadeInSection>
        <FadeInSection>
          <BenefitsSection />
        </FadeInSection>
        <FadeInSection>
          <PricingSection />
        </FadeInSection>
        <FadeInSection>
          <HowItWorksSection />
        </FadeInSection>
        <FadeInSection>
          <TestimonialsSection />
        </FadeInSection>
        <FadeInSection>
          <ContactSection />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  );
};

export default App;