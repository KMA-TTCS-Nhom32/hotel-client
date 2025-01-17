import React from 'react';
import { createTranslation } from '@/i18n';
import AboutPage from '@/components/About';

interface AboutProps {
  params: {
    lng: string;
  };
}

const About: React.FC<AboutProps> = async ({ params: { lng } }) => {
  const { t } = await createTranslation(lng, 'about');

  return (
    <AboutPage lng={lng} t={t} />
  );
};

export default About;
