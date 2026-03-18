import { getHistorics } from "@/utils/requests/lots_managment";
import { useEffect, useState } from "react";

type lotHistoricProps = {
    lotId: number
}

type lotHistoricResults = {
    id: number
    residentCpf: string
    employeeCpf: string
    action: string
    timestamp: string
}

export const LotHistoric = ({lotId} : lotHistoricProps) => {

const [historics, setHistorics] = useState<lotHistoricResults[]>([]);

  useEffect(() => {
    const fetchHistorics = async () => {
      if (lotId > 0) {
        const token = localStorage.getItem("token") ?? "";
        const response = await getHistorics(lotId, token);

        setHistorics(response.data);
      }
    };

    fetchHistorics();
  }, [lotId]);

  return (
    <div className="mt-8 shadow-sm w-[90vw]">
      <div className="  bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-2xl p-4 font-bold text-gray-900 flex items-center gap-2 ">
          Histórico de ações
        </h2>
      </div>
      <div className="bg-white p-4 max-h-[30vw] overflow-x-scroll">
        <table className="w-full border-collapse">
          <thead className="w-full">
            <tr className="text-sm">
              <th>Id</th>
              <th>Cpf do residente</th>
              <th>Cpf do empregado</th>
              <th>Ação</th>
              <th>Horário</th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-600">
            {
                historics.map((historic : lotHistoricResults)  => {

                    return (
                        <tr key={historic.id} className="border-b text-center">
                            <td>
                                {historic.id}
                            </td>
                        
                            <td>
                                {historic.residentCpf}
                            </td>

                            <td>
                                {historic.employeeCpf}
                            </td>

                            <td>
                                {historic.action}
                            </td>
                            <td>
                                {new Date(historic.timestamp).toLocaleString("pt-BR")}
                            </td>
                        </tr>
                    )

                })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
