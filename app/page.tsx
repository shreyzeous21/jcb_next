import About from "@/components/layout/About";
import Benefits from "@/components/layout/Benefits";
import CategoryListHome from "@/components/layout/CategoryListHome";
import HomeBanner from "@/components/layout/HomeBanner";
import StatsSection from "@/components/layout/StatsSection";
import React from "react";

export default function Home() {
  return (
    <div className=" mx-auto min-h-screen flex-col flex gap-10 py-6 px-4">
      <HomeBanner />
      <About />
      <CategoryListHome />
      <Benefits />
      <StatsSection />
    </div>
  );
}
