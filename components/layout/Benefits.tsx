import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { benefits } from "./constant";

const gradients = [
  "from-indigo-500/20 via-purple-500/10 to-pink-500/20",
  "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
  "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
  "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
  "from-rose-500/20 via-red-500/10 to-orange-500/20",
  "from-violet-500/20 via-fuchsia-500/10 to-pink-500/20",
];

export default function Benefits() {
  return (
    <Card className="w-full rounded-2xl border bg-background">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold">
          Benefits Of <span className="text-primary">Niks Parts</span>
        </CardTitle>
        <CardDescription className="max-w-xl mx-auto">
          Discover why businesses trust Niks Parts for growth, reliability, and
          long-term success.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.Icon;

            return (
              <Card
                key={benefit.title}
                className={`
                    relative overflow-hidden rounded-2xl border
                    bg-linear-to-br ${gradients[index % gradients.length]}
                    transition-all duration-300
                    hover:-translate-y-2 hover:shadow-xl
                  `}
              >
                {/* glow effect */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition">
                  <div className="absolute -inset-1 bg-linear-to-br from-primary/30 to-transparent blur-xl" />
                </div>

                <CardHeader className="relative z-10 space-y-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-background shadow-md">
                    <Icon className="text-3xl text-primary" />
                  </div>

                  <CardTitle className="text-lg font-semibold leading-tight">
                    {benefit.title}
                  </CardTitle>

                  <CardDescription className="text-sm">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
