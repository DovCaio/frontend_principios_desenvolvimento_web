"use client";
import { redirectoHomeUserType } from "@/utils/redirects/signin_redirects";
import { signinUser } from "@/utils/requests/sign";
import { BiBuildings } from "react-icons/bi";

export default function SignIn() {

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signinUser({
            cpf: e.currentTarget.cpf.value,
            password: e.currentTarget.password.value,
        });

        console.log(result);
        if (result && result.user) {
            localStorage.setItem("token", result.token);
            redirectoHomeUserType(result.user.type);

        }
    }

  return (
    <div className="bg-blue-100 h-screen flex items-center justify-center">
        <div className="flex flex-col h-fit bg-white rounded-lg shadow-lg p-8 m-4 w-1/3">
            <div className="flex flex-col items-center mb-4 w-full">
                <div className="bg-blue-600 rounded-full p-2 mb-4">
                    <BiBuildings className="text-4xl text-white bg-blue-600 rounded-full" />

                </div>
                <h1 className="text-2xl text-color-gray-900 font-bold ">Condomínio Manager</h1>
                <span className="text-gray-500 font-semibold">Entre com seu CPF e senha</span>
            </div>

            <form onSubmit={handleSubmit}>


                <div className="flex flex-col my-4">
                    <label htmlFor="cpf" className="font-semibold">CPF</label>
                    <input type="text" id="cpf" className="bg-gray-200 rounded-lg h-8 p-2" name="cpf" />

                </div>
                <div className="flex flex-col my-4">
                    <label htmlFor="password" className="font-semibold">Senha</label>
                    <input type="password" id="password" className="bg-gray-200 rounded-lg h-8 p-2" name="password" />
                </div>
                <div className="my-4">
                    <button type="submit" className="rounded-lg bg-gray-950 text-white w-full h-8 hover:cursor-pointer">Entrar</button>
                </div>
            </form>

        </div>
    </div>
  );
}