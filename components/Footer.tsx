import React from 'react';
import { BRANDING_CONFIG } from '../constants';
import { FaLinkedin, FaGithub, FaInstagram, FaBlog, FaYoutube, FaTwitter } from 'react-icons/fa'; // Using react-icons

const SocialIcon: React.FC<{ href: string; icon: React.ElementType; label: string }> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-brandTextOnSecondary hover:text-brandPrimary transition-colors duration-300"
  >
    <Icon size={24} />
  </a>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { socialMedia, shortName, slogan, website, email, mobile } = BRANDING_CONFIG.brand;

  return (
    <footer className="bg-brandSecondary text-brandTextOnSecondary py-8">
      <div className="container mx-auto px-4 text-center">
        {/* The main title logo image that was here has been removed */}
        <p className="mb-2 text-sm pt-4"> {/* Added pt-4 for some spacing if needed, or remove if not necessary */}
          &copy; {currentYear} <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-brandPrimary font-semibold">{shortName}</a>. All rights reserved.
        </p>
        <p className="mb-4 text-sm italic">{slogan}</p>
        <div className="flex justify-center space-x-6 mb-4">
          {socialMedia.linkedin && <SocialIcon href={socialMedia.linkedin} icon={FaLinkedin} label={`${shortName} on LinkedIn`} />}
          {socialMedia.github && <SocialIcon href={socialMedia.github} icon={FaGithub} label={`${shortName} on GitHub`} />}
          {socialMedia.instagram && <SocialIcon href={socialMedia.instagram} icon={FaInstagram} label={`${shortName} on Instagram`} />}
          {socialMedia.x && <SocialIcon href={socialMedia.x} icon={FaTwitter} label={`${shortName} on X`} />}
          {socialMedia.youtube && <SocialIcon href={socialMedia.youtube} icon={FaYoutube} label={`${shortName} on YouTube`} />}
          {socialMedia.blog && <SocialIcon href={socialMedia.blog} icon={FaBlog} label={`${shortName} Blog`} />}
        </div>
         <p className="text-xs">
          Contact: <a href={`mailto:${email}`} className="hover:text-brandPrimary">{email}</a> | 
          Phone: <a href={`tel:${mobile.replace(/\s/g, '')}`} className="hover:text-brandPrimary">{mobile}</a>
        </p>
        <p className="text-xs mt-2">
          Developed by Adhithya J [ AI Products Engineering Team ]
        </p>
      </div>
    </footer>
  );
};

export default Footer;