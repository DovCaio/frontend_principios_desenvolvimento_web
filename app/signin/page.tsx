export default function SignIn() {
  return (
    <div className="bg-blue-100 h-screen flex items-center justify-center">
        <div className="flex flex-col h-fit items-center justify-center bg-white rounded-lg shadow-lg p-8 m-4">
            <h2>LOGO</h2>
            <h1 className="text-2xl font-bold">Condominio Manager</h1>
            <span>Entre com seu CPF e senha</span>

            <div>


                <div className="flex flex-col">
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" className="bg-gray-200 rounded-lg h-8" name="cpf" />

                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div>
                    <button type="submit">Entrar</button>
                </div>
            </div>

        </div>
    </div>
  );
}