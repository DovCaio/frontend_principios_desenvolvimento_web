import { LeisureAreaRegistre } from "@/features/leisureAreaRegistre/LeisureAreaRegistre";
import { TreePalm } from "lucide-react";

export default function LeisureArea() {
  return (

    <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
        <TreePalm className="w-8 h-8 text-blue-600" />
        Áreas de lazer
        </h1>

        <LeisureAreaRegistre/>

    </div>
  );
}
