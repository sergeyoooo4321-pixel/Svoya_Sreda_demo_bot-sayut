import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { AssistanceSection } from "@/components/sections/AssistanceSection";
import { PopularProducts } from "@/components/sections/PopularProducts";
import { RoomsPreview } from "@/components/sections/RoomsPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DeliveryPreview } from "@/components/sections/DeliveryPreview";
import { CTASection } from "@/components/sections/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Своя Среда — современная мебель для дома",
  description: site.description
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <AssistanceSection />
      <PopularProducts />
      <RoomsPreview />
      <HowItWorks />
      <DeliveryPreview />
      <CTASection />
    </>
  );
}
