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


export const LoteAndResidentResponsabilities  = () => {


    const [lots, setLots] = useState<any[]>([]);
  const [showPop, setShowPop] = useState<boolean>(false);
  const [showPopYesOrNo, setShowPopYesOrNo] = useState<boolean>(false);
  const [args, setargs] = useState<any[]>([])
  const [showPopYesOrNo2, setShowPopYesOrNo2] = useState<boolean>(false);
  const [showPopYesOrNo3, setShowPopYesOrNo3] = useState<boolean>(false);
  const [lotId, setLotId] = useState<number>(-1);


  useEffect(() => {
    (async () => {
      const res = await getLots();
      console.log(res);
      setLots(res.data);
    })();
  }, []);

  const insertAnResident = (e: React.MouseEvent, lotId: number) => {
    e.preventDefault();

    setShowPop(true);

    setLotId(lotId);
  };

  const eventsToAlterTheResidentAndLot = async (
    e: React.MouseEvent,
    lotId: number,
    residentCpf: string,
  ) => {
    e.preventDefault()
    setargs([residentCpf, lotId, localStorage.getItem("token")])
  };

  return (
    <div>
      <ResidentAndLotsPopup show={showPop} setShow={setShowPop} lotId={lotId} />
      <PopUpyesOrNot waringMessage={"Tem certeza que deseja remover esse usuário?"} show={showPopYesOrNo} setShow={setShowPopYesOrNo} yesFunction={unmakeAResidentLiveInLot} args={args}/>
      <PopUpyesOrNot waringMessage={"Tem certeza que deseja fazer desse residente o responsável pelo lote?"} show={showPopYesOrNo2} setShow={setShowPopYesOrNo2} yesFunction={makeResidentResponsible} args={args}/>
      <PopUpyesOrNot waringMessage={"Tem certeza que deseja que esse residente não seja mais responsável pelo lote?"} show={showPopYesOrNo3} setShow={setShowPopYesOrNo3} yesFunction={unMakeResidentResponsible} args={args}/>
      

      <div className="mt-8 shadow-sm">
        <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 ">
            Lotes
          </h2>
        </div>
        <div className="bg-white p-4">
          {lots.map((value) => {
            return (
              <div key={value.id} className="flex justify-between">
                <div className="max-w-1/6 min-w-1/6">
                  <h2 className="font-bold">Lote {value.intercom}</h2>
                  <p className="text-gray-400 text-xs">Moradores:</p>
                  <div>
                    {!value.residents ? (
                      <p className="text-xs text-gray-400">Nenhum residente</p>
                    ) : (
                      value.residents.map((resident: { userCpf: string, id: number }) => {
                        return (
                          <div key={resident.userCpf} className="flex pl-8">
                            <p className="font-serif pr-6">
                              {resident.userCpf}
                            </p>

    
                            <button className="hover:cursor-pointer" onClick={(e) => {eventsToAlterTheResidentAndLot(e, value.id, resident.userCpf);setShowPopYesOrNo(true) }}>
                              <UserMinus className="text-red-600" />
                            </button>
                            {resident.id !== value.responsibleId ? (
                              <button className="hover:cursor-pointer">
                                <ShieldPlus className="text-green-600" onClick={(e) => {eventsToAlterTheResidentAndLot(e, value.id, resident.userCpf);setShowPopYesOrNo2(true)}} />
                              </button>
                            ) : (
                              <button className="hover:cursor-pointer" onClick={(e) => {eventsToAlterTheResidentAndLot(e, value.id, resident.userCpf);setShowPopYesOrNo3(true)}}>
                                <ShieldMinus className="text-red-600" />
                              </button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                <button
                  className="hover:cursor-pointer"
                  onClick={(e) => insertAnResident(e, value.id)}
                >
                  <HousePlus />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )

}