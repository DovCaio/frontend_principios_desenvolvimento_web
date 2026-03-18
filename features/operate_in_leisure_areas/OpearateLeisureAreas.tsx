"use client"
import { deleteLeisureAreaRequest, requestAllLeisureAreas } from "@/utils/requests/leisure_area";
import { useEffect, useState } from "react";

type LeisureArea =  {

    id: number
    name: string
    capacity: number

}

export const OpearateLeisureAreas = () => {

    const [leisureAreas, setLeisureAreas ] = useState<LeisureArea[]>([]) 

    useEffect(() => {
        (
            async () => {
                const response = await requestAllLeisureAreas()
                setLeisureAreas(response.data)
            }
        )()
    }, [])

    const deleteLeisureArea = (e: React.MouseEvent, id: number)=> {

        deleteLeisureAreaRequest(id)

    }

  return (
    <div className="mt-8 shadow-sm">
      <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 ">
          Operações em Áreas de lazer
        </h2>
      </div>

      <div className="bg-white p-4">
          <div  className="flex justify-between font-bold">
            <p>
                Nome
            </p>
            <p>
                Nome
            </p>

            <p>
                Capacidade
            </p>

            <p>
                Ação
            </p>
            </div>
        {
            leisureAreas.map((leisureArea: LeisureArea) => {
                
                return (
                    <div key={leisureArea.id} className="flex justify-between">
                        <p>
                            {leisureArea.id}

                        </p>
                        <p>
                            {leisureArea.name}

                        </p>
                        <p>
                            {leisureArea.capacity}

                        </p>

                        <button className="rounded p-2 bg-gray-800 text-white" onClick={e => deleteLeisureArea(e, leisureArea.id)}>
                            Delete
                        </button>
                    </div>
                )

            })
        }
      </div>
    </div>
  );
};
