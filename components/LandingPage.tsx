import React, { useEffect } from 'react';
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

interface LandingPageProps {
  onAdminAccessClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAdminAccessClick }) => {
  // Effect for fade-in animations on scroll
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

  // Effect for handling smooth scroll and preventing click/drag conflicts
  useEffect(() => {
    const handleSmoothScroll = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');

      // Ignore links that don't start with # or are just "#"
      if (!href || !href.startsWith('#') || href.length < 2) {
        return;
      }

      event.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // We calculate the offset to account for the sticky header (h-16 = 64px)
        const headerOffset = 64; 
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    // Attach event listeners to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll as EventListener);
    });

    // Cleanup function
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll as EventListener);
      });
    };
  }, []);

  return (
    <>
      <Header onAdminAccessClick={onAdminAccessClick} />
      <main>
        <FadeInSection><HeroSection /></FadeInSection>
        <FadeInSection><AboutSection /></FadeInSection>
        <FadeInSection><BenefitsSection /></FadeInSection>
        <FadeInSection><PricingSection /></FadeInSection>
        <FadeInSection><HowItWorksSection /></FadeInSection>
        <FadeInSection><TestimonialsSection /></FadeInSection>
        <FadeInSection><ContactSection /></FadeInSection>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;