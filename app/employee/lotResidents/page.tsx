"use client";

import { useEffect, useState } from "react";
import { House, ShieldPlus, HousePlus, ShieldMinus } from "lucide-react";
import { getLots } from "@/utils/requests/lots_managment";
import { ResidentAndLotsPopup } from "@/features/residents_and_lots/ResidentsAndLotsPopup";

export default function LotResidentes() {
  const [lots, setLots] = useState<any[]>([]);
  const [showPop, setShowPop] = useState<boolean>(false)
  const [lotId, setLotId] = useState<number>(-1)



  useEffect(() => {
    //Pega todos os lotes e seus respectivos moradores
    const results = [
      {
        id: "1",
        residents: [{ name: "caio", responsible: true }],
      },
    ];

    (async () => {
      const res = await getLots();
      //console.log(res);
    })();

    setLots(results);
  }, []);

  const insertAnResident = (e: React.MouseEvent, lotId: number) => {

    e.preventDefault()

    setShowPop(true)

    setLotId(lotId)

  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ResidentAndLotsPopup show={showPop} setShow={setShowPop} lotId={lotId}/>
        
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
        <House className="w-8 h-8 text-blue-600" />
        Residentes dos lotes
      </h1>
      <p className="text-gray-500">Gerencie os residentes e seus lotes.</p>

      <div className="mt-8 shadow-sm">
        <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 ">
            Lotes
          </h2>
        </div>
        <div className="bg-white p-4">
          {lots.map((value) => {
            return (
              <div key={value.id} className="flex gap-16">
                <div className="max-w-1/6 min-w-1/6">
                  <h2 className="font-bold">Lote {value.id}</h2>
                  <div>
                    {value.residents.map(
                      (resident: { name: string; responsible: boolean }) => {
                        return (
                          <div key={resident.name} className="flex pl-8">
                            <p>{resident.name}</p>{" "}
                            {!resident.responsible ? (
                              <button className="hover:cursor-pointer">
                                <ShieldPlus className="text-green-600" />
                              </button>
                            ) : (
                              <button className="hover:cursor-pointer">
                                <ShieldMinus className="text-red-600" />
                              </button>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
                <button className="hover:cursor-pointer" onClick={e => insertAnResident(e, value.id)}>
                  <HousePlus />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
