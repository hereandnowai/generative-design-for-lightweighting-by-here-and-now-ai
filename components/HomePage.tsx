
import React from 'react';
import { BRANDING_CONFIG } from '../constants';
import { FiCpu, FiLayers, FiBarChart2, FiBookOpen, FiArrowRight } from 'react-icons/fi'; // Using Feather Icons

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="p-3 bg-brandPrimary rounded-full mb-4">
      <Icon size={32} className="text-brandTextOnPrimary" />
    </div>
    <h3 className="text-xl font-semibold text-brandSecondary mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

interface HomePageProps {
  onNavigateToDesigner: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToDesigner }) => {
  const features: FeatureCardProps[] = [
    {
      icon: FiCpu,
      title: "Intelligent Design Generation",
      description: "Define your goals, and our AI algorithms will explore countless design variations to find the optimal solution for weight and strength.",
    },
    {
      icon: FiLayers,
      title: "Advanced Material Database",
      description: "Choose from a comprehensive library of materials. Analyze properties and select the best fit for your performance and manufacturing needs.",
    },
    {
      icon: FiBarChart2,
      title: "Insightful Performance Metrics",
      description: "Receive detailed reports on weight reduction, stress distribution, safety factors, and manufacturing feasibility to make informed decisions.",
    },
    {
      icon: FiBookOpen,
      title: "Learn & Innovate",
      description: "Access curated guides, best practices, and case studies to deepen your understanding of generative design principles.",
    },
  ];

  return (
    <div className="animate-fadeIn"> {/* Basic fade-in animation relying on Tailwind config */}
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 bg-gradient-to-br from-brandSecondary to-teal-700 rounded-xl shadow-2xl text-white mb-12">
        <div className="container mx-auto px-6">
          <img 
            src={BRANDING_CONFIG.brand.logo.title} 
            alt={`${BRANDING_CONFIG.brand.shortName} Logo`} 
            className="h-16 md:h-20 mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brandPrimary">
            Revolutionize Your Engineering Designs
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Harness the power of AI-driven generative design with {BRANDING_CONFIG.brand.shortName} to create lightweight, high-performance mechanical parts.
            Transform concepts into optimized realities, effortlessly.
          </p>
          <button
            onClick={onNavigateToDesigner}
            aria-label="Start Designing Now"
            className="bg-brandPrimary hover:bg-yellow-500 text-brandTextOnPrimary font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center group"
          >
            Start Designing Now
            <FiArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10">
        <h2 className="text-3xl font-bold text-brandSecondary text-center mb-10">
          Explore the Possibilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

       {/* About Snippet */}
      <section className="py-12 mt-8 bg-white rounded-xl shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-brandSecondary mb-4">
            Powered by {BRANDING_CONFIG.brand.shortName}
          </h2>
          <p className="text-gray-700 mb-3 max-w-3xl mx-auto">
            At <a href={BRANDING_CONFIG.brand.website} target="_blank" rel="noopener noreferrer" className="text-brandSecondary underline hover:text-brandPrimary font-semibold">{BRANDING_CONFIG.brand.shortName}</a>, we are passionate about innovation in artificial intelligence and engineering. This generative design platform is a testament to our commitment to providing cutting-edge tools that empower engineers and designers.
          </p>
          <p className="text-gray-600 italic">"{BRANDING_CONFIG.brand.slogan}"</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
