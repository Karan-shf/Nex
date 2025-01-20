import { useQuery } from "@tanstack/react-query";
import { APILink } from "../../consts/consts";
import { User } from "../../Interfaces/Interfaces";


function useOtherUser(id: string) {

    // console.log("iddddddd", id)
    return useQuery({
        queryKey: ['userProfile', id],
        queryFn: async () => {
            console.log('entered')
            const result = await fetch(APILink + `core/user/profile-id/${id}`, {
                headers: {
                    "x-auth-token": localStorage.getItem("x-auth-token") ?? ""
                },
            });
            const jsonResult = await result.json();
            console.log(jsonResult)
            if (result.ok) {
                return jsonResult as { data: User | undefined }
            } else {
                throw new Error(jsonResult.error);
            }
        },
        staleTime: 6 * 60 * 60 * 1000,
        //
        retry: 2
    })
}
export default useOtherUser;