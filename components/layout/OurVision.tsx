import Image from "next/image";

export default function OurVision() {
  return (
    <section className="flex flex-col gap-6 rounded-xl border bg-background p-6 md:flex-row md:items-center md:gap-10">
      {/* Logo */}
      <div className="flex justify-center md:justify-start">
        <Image
          src="/our-vision.png" // adjust if needed
          alt="Our Vision"
          width={1000}
          height={1000}
          className="h-60 w-auto object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 md:w-3/4">
        <h1 className="text-3xl font-bold tracking-tight">OUR VISION</h1>

        <p className="text-muted-foreground">
          <b> On time delivery and zero defected products.</b> <br /> Our vision
          is to provide our customers with sterling quality products with on
          time delivery. We aim on optimizing our supply chain network in order
          to achieve one of our avenues of mission. The latter will be achieved
          soon with our sincerity, consistency and persistency towards our work
          which is incomplete without our customers feedback.
        </p>
      </div>
    </section>
  );
}
