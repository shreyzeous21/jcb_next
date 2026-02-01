import { CategoryChart } from "./CategoryChart";
import { ProductChart } from "./ProductChart";
import { UserChart } from "./UserChart";

export default function Charts() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <UserChart />
      <ProductChart />
      <CategoryChart />
    </div>
  );
}
