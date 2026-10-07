import React from 'react';
import { Hero } from '../components/home/Hero';
import { BrandMarquee } from '../components/home/BrandMarquee';
import { FlashSale } from '../components/home/FlashSale';
import { Categories } from '../components/home/Categories';
import { SmartRecommendationSection } from '../components/home/SmartRecommendationSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { MemberExclusive } from '../components/home/MemberExclusive';
import { MotixGarage } from '../components/home/MotixGarage';
import { PromotionBanner } from '../components/home/PromotionBanner';
import { WhyMotix } from '../components/home/WhyMotix';
import { Testimonials } from '../components/home/Testimonials';
import { MarketingShowcase } from '../components/home/MarketingShowcase';

export const Home = () => {
  return (
    <div className="min-h-screen space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Section (In-Cockpit Vehicle Finder + Cinematic Visual) */}
      <Hero />

      {/* 2. Official OEM & Racing Brand Marquee Ticker */}
      <BrandMarquee />

      {/* 3. Flash Sale Deal of the Day (Telemetry Timer + Urgency) */}
      <FlashSale />

      {/* 4. Product Categories (Motorsport Sub-systems) */}
      <Categories />

      {/* 5. Smart Recommendation Section (AI Diagnostic Center & Vehicle Match) */}
      <SmartRecommendationSection />

      {/* 6. Featured Products & Best Sellers */}
      <FeaturedProducts />

      {/* 7. Member Exclusive (MOTIX Club Racing Lounge) */}
      <MemberExclusive />

      {/* 8. MOTIX Garage (Automotive Knowledge & Maintenance Guides) */}
      <MotixGarage />

      {/* 9. Promotion & Bundles Banner */}
      <PromotionBanner />

      {/* 10. Why Choose MOTIX (4 Value Pillars) */}
      <WhyMotix />

      {/* 11. Customer Reviews & Social Proof */}
      <Testimonials />

      {/* 12. Brand Core & Digital Marketing Journey */}
      <MarketingShowcase />
    </div>
  );
};
