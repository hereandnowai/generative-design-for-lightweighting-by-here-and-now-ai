
import React from 'react';
import { BRANDING_CONFIG } from '../constants';

const EducationalContent: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('concepts');

  const tabs = [
    { id: 'concepts', title: 'Generative Design Concepts' },
    { id: 'materials', title: 'Material Guide' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'case-studies', title: 'Case Studies' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'concepts':
        return (
          <div>
            <h3 className="text-lg font-semibold text-brandSecondary mb-2">What is Generative Design?</h3>
            <p className="mb-2">Generative design is an iterative design exploration process. Designers or engineers input design goals into generative design software, along with parameters such as performance or spatial requirements, materials, manufacturing methods, and cost constraints. The software explores all the possible permutations of a solution, quickly generating design alternatives. It tests and learns from each iteration what works and what doesn’t.</p>
            <h3 className="text-lg font-semibold text-brandSecondary mt-4 mb-2">Key Principles:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Goal-Driven:</strong> Starts with design goals and constraints.</li>
              <li><strong>Exploratory:</strong> Generates multiple design options.</li>
              <li><strong>Optimized:</strong> Aims for optimal performance, weight, or other specified criteria.</li>
              <li><strong>AI-Powered:</strong> Often utilizes artificial intelligence and machine learning algorithms.</li>
            </ul>
             <p className="mt-3 text-sm">This application, by <a href={BRANDING_CONFIG.brand.website} target="_blank" rel="noopener noreferrer" className="text-brandSecondary underline hover:text-brandPrimary">{BRANDING_CONFIG.brand.shortName}</a>, demonstrates these principles. {BRANDING_CONFIG.brand.slogan}.</p>
          </div>
        );
      case 'materials':
        return (
          <div>
            <h3 className="text-lg font-semibold text-brandSecondary mb-2">Lightweight Material Reference</h3>
            <p className="mb-2">Choosing the right material is crucial for lightweighting. Consider factors like density, strength-to-weight ratio, stiffness, and manufacturing compatibility.</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Aluminum Alloys:</strong> Good strength-to-weight ratio, corrosion resistance (e.g., 6061, 7075).</li>
              <li><strong>Titanium Alloys:</strong> Excellent strength-to-weight ratio, corrosion resistance, high cost (e.g., Ti-6Al-4V).</li>
              <li><strong>Carbon Fiber Composites:</strong> Extremely high stiffness and strength-to-weight ratio, complex manufacturing.</li>
              <li><strong>Magnesium Alloys:</strong> Lightest structural metal, good machinability.</li>
            </ul>
          </div>
        );
      case 'best-practices':
        return (
          <div>
            <h3 className="text-lg font-semibold text-brandSecondary mb-2">Best Practices for Lightweight Design</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Clearly define loads, boundary conditions, and constraints.</li>
              <li>Specify non-design regions accurately.</li>
              <li>Consider manufacturing limitations early in the process.</li>
              <li>Iterate on designs and explore multiple options.</li>
              <li>Validate designs with simulation (FEA) and physical testing.</li>
            </ul>
          </div>
        );
      case 'case-studies':
        return (
          <div>
            <h3 className="text-lg font-semibold text-brandSecondary mb-2">Industry Case Studies</h3>
            <p className="mb-2"><strong>Aerospace Bracket Example:</strong></p>
            <p className="mb-2">A common example is an aerospace bracket, where generative design was used to reduce weight from 961g to 136g (an 86% reduction) while maintaining structural performance and meeting all safety factors. This leads to significant fuel savings over the aircraft's lifespan.</p>
            <p className="mb-2"><strong>Automotive Component:</strong></p>
            <p>Generative design has been applied to automotive parts like seatbelt brackets or suspension components, achieving weight reductions of 40-60% and improving vehicle efficiency and performance.</p>
             <p className="mt-3 text-sm">Discover more innovative solutions at the <a href={BRANDING_CONFIG.brand.socialMedia.blog} target="_blank" rel="noopener noreferrer" className="text-brandSecondary underline hover:text-brandPrimary">{BRANDING_CONFIG.brand.shortName} Blog</a>.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-brandSecondary mb-4">Educational Resources</h2>
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-brandPrimary text-brandSecondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-150`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <div className="prose max-w-none">
        {renderContent()}
      </div>
    </div>
  );
};

export default EducationalContent;
