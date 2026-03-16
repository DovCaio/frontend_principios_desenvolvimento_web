import { redirect, RedirectType } from 'next/navigation'


export const redirectoHomeUserType = (userType: string) => {
    console.log(userType)
    switch (userType) {
        case "RESIDENT":
            redirect("/resident", RedirectType.replace);
            break;
        case "EMPLOYEE":
            redirect("/employee", RedirectType.replace);
            break;
        case "VISITOR":
            redirect("/visitor", RedirectType.replace);
            break;
        default:
            throw new Error("Invalid user type");
    }
}