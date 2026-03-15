import { redirect, RedirectType } from 'next/navigation'


export const redirectoHomeUserType = (userType: string) => {
    switch (userType) {
        case "RESIDENT":
            redirect("/resident", RedirectType.replace);
            break;
        case "empregado_area_lazer":
            redirect("/employee", RedirectType.replace);
            break;
        case "Employee":
            redirect("/employee", RedirectType.replace);
            break;
        case "empregado_portaria":
            redirect("/employee", RedirectType.replace);
            break;
        case "VISITOR":
            redirect("/visitor", RedirectType.replace);
            break;
        default:
            throw new Error("Invalid user type");
    }
}