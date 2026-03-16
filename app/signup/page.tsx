"use client";
import { MainUserTypeDefinition } from "@/features/signup_usertype_definition/main_usertype_definition";
import { BiBuildings } from "react-icons/bi";

import { useState } from "react";
import { signupNewUser } from "@/utils/requests/sign";


import { redirect, RedirectType } from 'next/navigation'

export default function SignUp() {
    const [userType, setUserType] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signupNewUser({
      cpf: e.currentTarget.cpf.value,
      name: e.currentTarget.userName.value,
      phone: e.currentTarget.phone.value,
      password: e.currentTarget.password.value,
      userType: userType,
      employee: {employeeType: ""}
    });

    // Ensure result is not void and has a status property
    if (result && result.ok) {
      redirect("/signin")
    }
  };

  return (
    <div className="bg-blue-100 h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-fit bg-white rounded-lg shadow-lg p-8 m-4 w-1/3"
      >
        <div className="flex flex-col items-center mb-4 w-full">
          <div className="bg-blue-600 rounded-full p-2 mb-4">
            <BiBuildings className="text-4xl text-white bg-blue-600 rounded-full" />
          </div>
          <h1 className="text-2xl text-color-gray-900 font-bold ">
            Criar Conta
          </h1>
          <span className="text-gray-500 font-semibold">
            Preencha os campos abaixo para criar sua conta
          </span>
        </div>

        <div>
          <div>
            <div className="flex flex-col my-4">
              <label htmlFor="cpf" className="font-semibold">
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                className="bg-gray-200 rounded-lg h-8 p-2"
                name="cpf"
              />
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="userName" className="font-semibold">
                Nome
              </label>
              <input
                type="text"
                id="userName"
                className="bg-gray-200 rounded-lg h-8 p-2"
                name="userName"
              />
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="phone" className="font-semibold">
                phone
              </label>
              <input
                type="text"
                id="phone"
                className="bg-gray-200 rounded-lg h-8 p-2"
                name="phone"
              />
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="password" className="font-semibold">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-200 rounded-lg h-8 p-2"
                name="password"
              />
            </div>
          </div>

          <div>
            <MainUserTypeDefinition userType={userType} setUserType={setUserType} />
          </div>

          <div className="my-4">
            <button
              type="submit"
              className="rounded-lg bg-gray-950 text-white w-full h-8 hover:cursor-pointer font-bold"
            >
              Criar Conta
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
