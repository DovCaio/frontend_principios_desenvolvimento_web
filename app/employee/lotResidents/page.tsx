"use client";

import {
  House,
} from "lucide-react";

import { LoteAndResidentResponsabilities } from "@/features/lote_and_resident_resposabilities/LoteAndResidentResposabilities";
import { LoteCreation } from "@/features/lote_creation/LoteCreation";

export default function LotResidentes() {

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
        <House className="w-8 h-8 text-blue-600" />
        Residentes dos lotes
      </h1>
      <p className="text-gray-500">Gerencie os residentes e seus lotes.</p>
      <LoteAndResidentResponsabilities/>
      <LoteCreation/>
      
    </div>
  )

}
