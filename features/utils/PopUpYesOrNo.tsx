import { AxiosResponse } from "axios";
import { PopUp } from "./Popup"
type PopUpProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  yesFunction: (...args: any[]) =>  Promise<AxiosResponse>;
  waringMessage: string

  args :  any[]
};
export const PopUpyesOrNot = ({show, setShow, waringMessage, yesFunction, args} : PopUpProps) => {

    const callFunction = async () => {
        await yesFunction(...args) //Isso me parece perigoso
    }


    return (
        <PopUp show={show} setShow={setShow}>
            <div>
                <h3 className="font-bold text-2xl p-4 mb-4">{waringMessage}</h3>
                <div className="flex justify-between gap-4">

                    <button onClick={callFunction} className="font-bold bg-gray-700 text-white p-2 w-1/2 rounded hover:bg-green-600 hover:cursor-pointer">Sim</button>
                    <button onClick={(e) => {setShow(false)}} className="font-bold bg-gray-700 text-white p-2 w-1/2 rounded hover:bg-red-600 hover:cursor-pointer">Não</button>
                </div>
            </div>
        </PopUp>
    )

}