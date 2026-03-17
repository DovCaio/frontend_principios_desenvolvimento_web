import { createLot } from "@/utils/requests/lots_managment"

export const LoteCreation = () => {


    const handleLotCreation = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const intercom = e.currentTarget.intercom.value
        createLot(intercom)
    }

    return (
        <div className="mt-8 shadow-sm">

            <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">

                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 ">
                    Criar um novo lote
                </h2>
            </div>

            <form className="bg-white p-4" onSubmit={handleLotCreation}>

                <div className="flex flex-col gap-2">
                    <label htmlFor="intercom" className="font-bold">Inter comunicador</label>
                    <input type="text" id="intercom" name="intercom" className="w-1/2 pl-2 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" />

                </div>

                <button type="submit" className="bg-gray-800 rounded p-2 text-white mt-2 w-full font-bold hover:cursor-pointer" >Criar</button>
            
            </form>
        </div>
    )

}