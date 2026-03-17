"use client";

import { useEffect, useState } from "react";
import {
  House,
  ShieldPlus,
  HousePlus,
  UserMinus,
  ShieldMinus,
} from "lucide-react";
import { getLots, makeResidentResponsible, unmakeAResidentLiveInLot, unMakeResidentResponsible } from "@/utils/requests/lots_managment";
import { ResidentAndLotsPopup } from "@/features/residents_and_lots/ResidentsAndLotsPopup";
import { PopUpyesOrNot } from "@/features/utils/PopUpYesOrNo";
import { LoteAndResidentResponsabilities } from "@/features/lote_and_resident_resposabilities/LoteAndResidentResposabilities";

export default function LotResidentes() {

  return (
    <div>
      <LoteAndResidentResponsabilities/>
    </div>
  )

}
