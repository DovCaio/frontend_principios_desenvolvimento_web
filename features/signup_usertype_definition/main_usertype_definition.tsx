"use client";

import { useState } from "react";
import { ResidentDefinition } from "./resident_definition";
import { LeisureAreaEmployeeDefinition } from "./leisure_area_employee_definition";
import { ManagmentEmployeeDefinition } from "./managment_emplyee_definition";
import { GateEmployeeDefinition } from "./gate_employee_definition";
import { VistantDefinition } from "./vistant_definition";

export const MainUserTypeDefinition = () => {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center mb-4 w-full">

      <div className="flex flex-col items-center mb-4 w-full">
        <span className="font-semibold text-center w-full">Tipo de Usuário</span>
        <div className="flex gap-2 my-4 flex-wrap justify-center">
          <button 
            className="bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700"
            onClick={() => setSelectedUserType("Residente")}
          >
            Residente
          </button>
          <button 
            className="bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700"
            onClick={() => setSelectedUserType("Empregado Da Área de lazer")}
          >
            Empregado Da Área de lazer
          </button>
          <button 
            className="bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700"
            onClick={() => setSelectedUserType("Empregado gerência")}
          >
            Empregado gerência
          </button>
          <button 
            className="bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700"
            onClick={() => setSelectedUserType("Empregado Portaria")}
          >
            Empregado Portaria
          </button>
          <button 
            className="bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700"
            onClick={() => setSelectedUserType("Visitante")}
          >
            Visitante
          </button>
        </div>
      </div>

      <div>
        {selectedUserType === "Residente" && (
          <ResidentDefinition/>
        )}
        {selectedUserType === "Empregado Da Área de lazer" && (
          <LeisureAreaEmployeeDefinition/>
        )}
        {selectedUserType === "Empregado gerência" && (
          <ManagmentEmployeeDefinition/>
        )}
        {selectedUserType === "Empregado Portaria" && (
          <GateEmployeeDefinition/>
        )}
        {selectedUserType === "Visitante" && (
          <VistantDefinition/>
        )}
      </div>
    </div>
  );
};
