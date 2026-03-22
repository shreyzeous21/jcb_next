import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { benefits } from "./constant";

export default function Benefits() {
  return (
    <Card className="w-full bg-background border-none">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold text-yellow-400">
          Benefits Of <span className="text-yellow-500">Niks Parts</span>
        </CardTitle>
        <CardDescription className="max-w-xl mx-auto">
          Discover why businesses trust Niks Parts for growth, reliability, and
          long-term success.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.Icon;

            return (
              <Card
                key={benefit.title}
                className="relative overflow-hidden rounded-2xl border border-yellow-600 bg-yellow-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-500/40 hover:bg-yellow-300"
              >
                <CardHeader className="relative z-10 space-y-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-yellow-600/20 border border-yellow-600/40 shadow-md">
                    <Icon className="text-3xl text-yellow-800" />
                  </div>

                  <CardTitle className="text-lg font-semibold leading-tight text-yellow-900">
                    {benefit.title}
                  </CardTitle>

                  <CardDescription className="text-sm whitespace-pre-line text-yellow-800">
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
