import { useEffect, useState } from "react";
import { PopUp } from "../utils/Popup";
import {
  getResidentsWithoutALot,
  makeAResidentLiveInLot,
} from "@/utils/requests/lots_managment";
import { HousePlus } from "lucide-react";

type ResidentAndLotsPopupProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  lotId: number;
};

export const ResidentAndLotsPopup = ({
  show,
  setShow,
  lotId,
}: ResidentAndLotsPopupProps) => {
  const [residents, setResidents] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getResidentsWithoutALot();
      setResidents(result.data);
    })();
  }, []);

  const makeResidentOfALot = async (
    e: React.MouseEvent,
    residentCpf: number,
  ) => {
    e.preventDefault();

    console.log(
      await makeAResidentLiveInLot(
        residentCpf,
        lotId,
        localStorage.getItem("token") ?? "",
      ),
    );
  };

  return (
    <PopUp show={show} setShow={setShow}>
      <div>
        <h2 className="font-bold text-2xl p-2">Usuários sem lote</h2>
        {residents.map((resident) => {
          return (
            resident.lotId === null && (
              <div key={resident.user.cpf} className="flex justify-between bg-gray-100 p-2 rounded m-1">
                {<p>{resident.user.cpf}</p>}

                <button
                  className="hover:cursor-pointer hover:text-gray-500"
                  onClick={(e) => makeResidentOfALot(e, resident.user.cpf)}
                >
                  <HousePlus />
                </button>
              </div>
            )
          );
        })}
      </div>
    </PopUp>
  );
};
