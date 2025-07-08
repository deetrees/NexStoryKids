import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Technology from './components/Technology';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Technology />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;