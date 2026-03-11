"use client";

import { useState } from "react";
import { ResidentDefinition } from "./resident_definition";
import { LeisureAreaEmployeeDefinition } from "./leisure_area_employee_definition";
import { ManagmentEmployeeDefinition } from "./managment_emplyee_definition";
import { GateEmployeeDefinition } from "./gate_employee_definition";
import { VistantDefinition } from "./vistant_definition";

export const MainUserTypeDefinition = ({ userType, setUserType }: { userType: string | null; setUserType: React.Dispatch<React.SetStateAction<string | null>> }) => {

  const setUserTypeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const type = e.currentTarget.textContent;
    if (type) {
      setUserType(type);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4 w-full">

      <div className="flex flex-col items-center mb-4 w-full">
        <span className="font-semibold text-center w-full">Tipo de Usuário</span>
        <div className="flex gap-2 my-4 flex-wrap justify-center">
          <button 
            className={`bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700 ${ userType === "Residente" ? "bg-blue-700" : ""}`}
            onClick={setUserTypeHandler}
          >
            Residente
          </button>
          <button 
            className={`bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700 ${ userType === "Empregado Da Área de lazer" ? "bg-blue-700" : ""}`}
            onClick={setUserTypeHandler}
          >
            Empregado Da Área de lazer
          </button>
          <button 
            className={`bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700 ${ userType === "Empregado gerência" ? "bg-blue-700" : ""}`}
            onClick={setUserTypeHandler}
          >
            Empregado gerência
          </button>
          <button 
            className={`bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700 ${ userType === "Empregado Portaria" ? "bg-blue-700" : ""}`}
            onClick={setUserTypeHandler}
          >
            Empregado Portaria
          </button>
          <button 
            className={`bg-blue-600 text-white p-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-blue-700 ${ userType === "Visitante" ? "bg-blue-700" : ""}`}
            onClick={setUserTypeHandler}
          >
            Visitante
          </button>
        </div>
      </div>

      <div>
        {userType === "Residente" && (
          <ResidentDefinition/>
        )}
        {userType === "Empregado Da Área de lazer" && (
          <LeisureAreaEmployeeDefinition/>
        )}
        {userType === "Empregado gerência" && (
          <ManagmentEmployeeDefinition/>
        )}
        {userType === "Empregado Portaria" && (
          <GateEmployeeDefinition/>
        )}
        {userType === "Visitante" && (
          <VistantDefinition/>
        )}
      </div>
    </div>
  );
};
