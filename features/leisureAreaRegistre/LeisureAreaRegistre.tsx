"use client"
import { postAnLeisureArea } from "@/utils/requests/leisure_area";

export const LeisureAreaRegistre = () => {

    const registerNewLeisureArea = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const name =  e.currentTarget.name_.value
        const capacity =  e.currentTarget.capacity.value

        postAnLeisureArea(name, capacity)
    }

  return (
    <div className="mt-8 shadow-sm">
      <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 ">
          Criar uma Área de lazer
        </h2>
      </div>

      <form className="bg-white flex-col p-4 " onSubmit={registerNewLeisureArea}>
        <div className="flex flex-col font-bold text-gray-500 mb-4">
          <label htmlFor="name_" className="text-xl">
            Nome:{" "}
          </label>
          <input
            type="text"
            id="name_"
            name="name_"
            className="w-1/2 p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono bg-gray-50"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="capacity"
            className="flex flex-col font-bold text-gray-500"
          >
            Capacidade:{" "}
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            className="w-1/6 p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono bg-gray-50"
          />
        </div>

        <button className="rounded bg-gray-800 text-white p-2 w-full mt-8">
          Registrar
        </button>
      </form>
    </div>
  );
};
