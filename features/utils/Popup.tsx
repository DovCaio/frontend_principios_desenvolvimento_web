import { CircleX } from "lucide-react";

type PopUpProps = {
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopUp = ({ children, show, setShow }: PopUpProps) => {
    const closePopUp = (e : React.MouseEvent) => {
        e.preventDefault()
        setShow(false)

    }

  return (
    <div
      className={`${!show ? "hidden" : ""} w-full h-full bg-gray-600 absolute top-0 left-0 flex items-center justify-center opacity-90`}
    >
      <div className="bg-white rounded p-8 relative">
        <button onClick={closePopUp} className="absolute top-2 right-1 hover:cursor-pointer hover:text-gray-400">
          <CircleX></CircleX>
        </button>
        {children}
      </div>
    </div>
  );
};
