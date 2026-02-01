export default function Page() {
  return (
    <section className="mx-auto  px-4 py-6">
      <div className="space-y-4">
        {/* HEADER */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Quality</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Delivering excellence through uncompromised standards and
            customer-focused processes.
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            At <span className="font-medium text-foreground">Niks Parts</span>,
            our customers&apos; satisfaction speaks volumes about our commitment
            to quality. Every product we deliver goes through multiple levels of
            security and quality checks before reaching our customers.
          </p>

          <p>
            Our primary goal is to offer{" "}
            <span className="font-medium text-foreground">
              high-quality products at a highly competitive pricing structure
            </span>
            , without ever compromising on standards.
          </p>

          <h2 className="pt-2 text-xl font-semibold tracking-tight text-foreground">
            Quality in practice
          </h2>
          <p>
            Quality has always been our topmost priority. Our team of experts
            continuously works on enhancing product quality whenever there is
            room for improvement. We invest in training and modern processes so
            that every step—from sourcing to packaging—meets the same high bar.
          </p>

          <p>
            We ensure that only{" "}
            <span className="font-medium text-foreground">
              premium-grade materials
            </span>{" "}
            are used during manufacturing. This strict chain of quality control
            continues through every stage until the product is delivered.
            Incoming materials are inspected, production is monitored, and
            finished goods are checked again before dispatch.
          </p>

          <h2 className="pt-2 text-xl font-semibold tracking-tight text-foreground">
            Beyond delivery
          </h2>
          <p>
            Our responsibility doesn&apos;t end at delivery. Customer feedback
            helps us refine our services, and our prompt response to customer
            requests and concerns is key to building long-term trust. We treat
            every enquiry and complaint as an opportunity to improve.
          </p>

          <p>
            We believe that consistent quality builds lasting partnerships.
            Whether you need a single order or ongoing supply, you can rely on{" "}
            <span className="font-medium text-foreground">Niks Parts</span> for
            the same standards every time. Thank you for trusting us with your
            business.
          </p>
        </div>
      </div>
    </section>
  );
}
