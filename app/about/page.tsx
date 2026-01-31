import About from "@/components/layout/About";
import OurMission from "@/components/layout/OurMission";
import OurVision from "@/components/layout/OurVision";

export default function AboutPage() {
  return (
    <div className=" mx-auto min-h-screen flex-col flex gap-10 py-6 px-4">
      <About />
      <OurMission />
      <OurVision />
    </div>
  );
}
