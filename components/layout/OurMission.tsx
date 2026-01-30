import Image from "next/image";

export default function OurMission() {
  return (
    <section className="flex flex-col gap-6 rounded-xl border bg-background p-6 md:flex-row md:items-center md:gap-10">
      {/* Logo */}

      {/* Content */}
      <div className="flex flex-col gap-4 md:w-3/4">
        <h1 className="text-3xl font-bold tracking-tight">OUR MISSION</h1>

        <p className="text-muted-foreground">
          Our mission is to grow our Intel around the globe so strong via
          providing best quality products to our customers as they are apex in
          our Niks family. Most critical is to evolve our supply chain to bring
          utmost efficiency and effectiveness along with good responsiveness. By
          deploying our hard working workers to give their best everyday being
          commensurate with rewards and recognition, we can say with full
          confidence that goal of zero defected products will be achieved soon.
          With the amalgamation of our customers help and our family’s
          willingness towards providing customers with the best, we can say we
          will be heading towards new missions soon.
        </p>
      </div>
      <div className="flex justify-center md:justify-start">
        <Image
          src="/our-mission.png" // adjust if needed
          alt="Our Mission"
          width={1000}
          height={1000}
          className="h-60 w-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}
