import About from "@/components/layout/About";
import HomeBanner from "@/components/layout/HomeBanner";
import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen flex-col flex gap-10 py-6 px-4">
      <HomeBanner />
      <About />
    </div>
  );
}
