
import React from 'react';
import { BRANDING_CONFIG } from '../constants';
import { FiEye, FiTarget, FiHeart, FiZap, FiNavigation, FiUsers, FiAward } from 'react-icons/fi'; // Feather Icons

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  description: string | React.ReactNode; // Allow JSX for description (e.g., lists)
  color?: string; // Optional color for icon background
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, title, description, color = 'bg-brandPrimary' }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
    <div className={`p-3 ${color} rounded-full mb-4 self-start`}>
      <Icon size={28} className="text-brandTextOnPrimary" />
    </div>
    <h3 className="text-xl font-semibold text-brandSecondary mb-2">{title}</h3>
    {typeof description === 'string' ? (
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    ) : (
      <div className="text-gray-600 text-sm leading-relaxed">{description}</div>
    )}
  </div>
);


const AboutPage: React.FC = () => {
  const companyInfo = {
    vision: {
      icon: FiEye,
      title: "Our Vision",
      description: "To be at the forefront of artificial intelligence innovation, empowering industries worldwide with transformative solutions that redefine possibilities and drive sustainable progress.",
      color: "bg-blue-500",
    },
    mission: {
      icon: FiTarget,
      title: "Our Mission",
      description: "To research, develop, and deploy cutting-edge AI technologies that solve complex real-world problems, foster creativity, and enhance human potential, ensuring ethical and responsible AI practices.",
      color: "bg-green-500",
    },
    values: {
      icon: FiHeart,
      title: "Our Core Values",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Innovation:</strong> Continuously exploring new frontiers in AI.</li>
          <li><strong>Integrity:</strong> Upholding the highest ethical standards.</li>
          <li><strong>Collaboration:</strong> Fostering partnerships for greater impact.</li>
          <li><strong>Excellence:</strong> Striving for quality in all our endeavors.</li>
          <li><strong>Impact:</strong> Creating solutions that make a meaningful difference.</li>
        </ul>
      ),
      color: "bg-purple-500",
    },
    journey: {
        icon: FiNavigation,
        title: "Our Journey",
        description: `Founded with a passion for ${BRANDING_CONFIG.brand.slogan.replace('designed with passion for ','').toLowerCase()}, ${BRANDING_CONFIG.brand.shortName} began as a collective of AI enthusiasts and researchers. Our goal was to bridge the gap between theoretical AI and practical, impactful applications. Today, we are a growing team dedicated to pushing the boundaries of generative AI and other advanced technologies.`,
        color: "bg-orange-500"
    },
    commitment: {
        icon: FiAward,
        title: "Commitment to Excellence",
        description: `At ${BRANDING_CONFIG.brand.shortName}, we are dedicated to providing state-of-the-art tools like this Generative Design Platform. We believe in empowering engineers, designers, and innovators by making complex AI capabilities accessible and user-friendly.`,
        color: "bg-teal-500"
    },
    team: {
        icon: FiUsers,
        title: "Our Team",
        description: `Our diverse team comprises AI researchers, software engineers, UX designers, and domain experts, all working together to build intelligent systems. We thrive on creativity, continuous learning, and a shared passion for technology's potential to shape a better future.`,
        color: "bg-pink-500"
    }
  };

  return (
    <div className="animate-fadeIn py-8">
      <section className="text-center mb-12">
        <img 
            src={BRANDING_CONFIG.brand.logo.title} 
            alt={`${BRANDING_CONFIG.brand.shortName} Logo`} 
            className="h-16 md:h-20 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-brandSecondary mb-3">
          About {BRANDING_CONFIG.brand.shortName}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          {BRANDING_CONFIG.brand.longName} - {BRANDING_CONFIG.brand.slogan}.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <InfoCard {...companyInfo.vision} />
        <InfoCard {...companyInfo.mission} />
        <InfoCard {...companyInfo.values} />
        <InfoCard {...companyInfo.journey} />
        <InfoCard {...companyInfo.commitment} />
        <InfoCard {...companyInfo.team} />
      </section>

      <section className="mt-12 py-8 bg-white rounded-xl shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-brandSecondary mb-4">
            Connect With Us
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            We're always excited to discuss new ideas, collaborations, or how our AI solutions can help your business.
            Reach out to us to learn more.
          </p>
          <a
            href={`mailto:${BRANDING_CONFIG.brand.email}`}
            className="bg-brandPrimary hover:bg-yellow-500 text-brandTextOnPrimary font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center group"
          >
            Contact Us
            <FiZap size={20} className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
