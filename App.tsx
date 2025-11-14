import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import BenefitsSection from './components/BenefitsSection';
import PricingSection from './components/PricingSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FadeInSection from './components/FadeInSection';

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
          <ContactForm />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  );
};

export default App;