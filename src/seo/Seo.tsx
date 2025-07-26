import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonicalUrl,
  image,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="keywords" content='Sustainability Olympiad, Teri, SDG, Green Olympiad, Green, Sustainability Test, SDG, UN Goals, IndiaESG, sustainability education, students, grade 4-10, environment, social responsibility, sustainable future, climate change, free olympiad, SDG quiz, sustainability quiz for students' />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {image && <meta property="og:image" content={image} />}

      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default Seo;
