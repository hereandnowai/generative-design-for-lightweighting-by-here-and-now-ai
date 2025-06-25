
import React from 'react';
import { BRANDING_CONFIG } from '../constants';

type PageType = 'home' | 'designer' | 'about' | 'history';

interface HeaderProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

const NavLink: React.FC<{
  label: string;
  onClick: () => void;
  isActive: boolean;
}> = ({ label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'bg-brandPrimary text-brandTextOnPrimary'
        : 'text-gray-300 hover:bg-brandSecondary/70 hover:text-white'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    {label}
  </button>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  return (
    <header className="bg-brandSecondary text-brandTextOnSecondary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => onNavigate('home')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-brandPrimary rounded-md">
            {/* Favicon image removed from here */}
            <img 
              src={BRANDING_CONFIG.brand.logo.title} 
              alt={`${BRANDING_CONFIG.brand.shortName} Logo`} 
              className="h-10 sm:h-12" // Adjusted height for visibility, can be sm:block if preferred
            />
             <span className="text-xl font-bold ml-3 sm:hidden text-white">{BRANDING_CONFIG.brand.shortName}</span>
          </button>
        </div>
        
        <nav className="flex items-center space-x-1 sm:space-x-2">
           <NavLink label="Home" onClick={() => onNavigate('home')} isActive={currentPage === 'home'} />
           <NavLink label="Designer" onClick={() => onNavigate('designer')} isActive={currentPage === 'designer'} />
           <NavLink label="History" onClick={() => onNavigate('history')} isActive={currentPage === 'history'} />
           <NavLink label="About Us" onClick={() => onNavigate('about')} isActive={currentPage === 'about'} />
        </nav>

        <div className="text-right hidden lg:block">
            <h1 className="text-lg font-semibold text-brandPrimary">Generative Design Platform</h1>
            <p className="text-xs text-gray-300 italic">{BRANDING_CONFIG.brand.slogan}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
