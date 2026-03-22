import About from "@/components/layout/About";
import Benefits from "@/components/layout/Benefits";
import CategoryListHome from "@/components/layout/CategoryListHome";
import HomeBanner from "@/components/layout/HomeBanner";
import StatsSection from "@/components/layout/StatsSection";
import RandomProductListing from "@/components/shop/RandomProductListing";
import PhotonBeam from "@/components/ui/photon-beam";
import React from "react";

export default function Home() {
  return (
    <div className=" mx-auto min-h-screen flex-col flex gap-10 py-6 px-4">
      <HomeBanner />
      <section className="relative flex lg:h-[380px] h-[250px] w-full items-center justify-center overflow-hidden bg-background">
        <PhotonBeam
          transparentBg
          colorLine="#facc15" // yellow-400
          colorSignal="#fde047" // yellow-300
          colorSignal2="#fbbf24" // amber-400
          colorSignal3="#ca8a04" // yellow-600 (deeper gold)
          useColor2
          useColor3
          lineCount={72}
          spreadHeight={28}
          signalCount={80}
          speedGlobal={0.28}
          trailLength={4}
          bloomStrength={2.2}
          bloomRadius={0.4}
          lineOpacity={0.4}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <p className="text-center font-serif text-sm font-medium uppercase tracking-[0.35em] text-primary drop-shadow-sm">
            Precision · Power · Parts
          </p>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground drop-shadow-sm sm:text-4xl">
            Quality JCB Spare Parts
          </h2>
          <p className="max-w-md text-center text-sm text-muted-foreground drop-shadow-sm">
            Trusted across India for genuine parts and reliable service
          </p>
        </div>
      </section>
      <RandomProductListing />
      <About />
      {/* <CategoryListHome /> */}
      <Benefits />
      {/* <StatsSection /> */}
    </div>
  );
}
