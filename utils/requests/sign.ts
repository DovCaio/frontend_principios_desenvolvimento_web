import { url } from "../constants/url";


export const signupNewUser = async (data: {
    employee: { employeeType: string; }; cpf: string; name: string; phone: string; password: string; userType: string | null 
}) => {
    let uri = "";
    console.log(data.userType)
    switch (data.userType) {
        case "Residente":
            data.userType = "RESIDENT";
            uri = "/resident";
            break;
        case "Empregado Da Área de lazer":
            data.userType = "empregado_area_lazer";
            data.employee = {employeeType: "LeisureAreaEmployee"};

            uri = "/employee";
            break;
        case "Empregado gerência":
            data.userType = "Employee";
            data.employee = {employeeType: "ManagementEmployee"};
            uri = "/employee";
            break;
        case "Empregado Portaria":
            data.userType = "empregado_portaria";
            data.employee = {employeeType: "GateEmployee"};
            uri = "/employee";
            break;
        case "Visitante":
            data.userType = "VISITOR";
            uri = "/visitor";
            break;
        default:
            throw new Error("Invalid user type");
    }


  try {
    const response = await fetch(`${url}${uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    const result = await response.json();
    console.log("Signup successful:", result);
  } catch (error) {
    console.error("Error signing up:", error);
  }
}


export const signinUser = async (data: { cpf: string; password: string }) => {
    try {
        const response = await fetch(`${url}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to sign in");
        }

        const result = await response.json();
        console.log("Signin successful:", result);
        return result;
    } catch (error) {
        console.error("Error signing in:", error);
    }
}