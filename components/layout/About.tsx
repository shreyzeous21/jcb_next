import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function About() {
  return (
    <section className="flex flex-col gap-6  md:flex-row md:items-center md:gap-10">
      {/* Logo */}
      <div className="flex justify-center md:justify-start md:w-1/3">
        <Image
          src="/jcblogo.jpg" // adjust if needed
          alt="NIKS Spare Parts Logo"
          width={1000}
          height={1000}
          className="h-60 w-auto object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 md:w-2/3">
        <h1 className="text-3xl font-bold tracking-tight">
          WHY “NIKS SPARE PARTS”
        </h1>

        <p className="text-muted-foreground">
          Niks Spares is a worldwide quality supplier of new replacement parts
          for JCB® equipment and engines. At NIKS SPARES, we not only offer
          premium parts but also exceptional service, outstanding savings, and
          fast, accurate order fulfillment.
        </p>

        <p className="text-muted-foreground">
          Founded in 2023, our company follows the principle of
          <span className="font-medium text-foreground">
            {" "}
            quality first, competitive pricing
          </span>
          , delivering reliable products and trusted service to partners
          worldwide. Through strong collaboration, we support JCB machinery
          operators and manufacturers across global markets.
        </p>

        <div>
          <Link href="/about">
            <Button className="mt-2">Read More</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
