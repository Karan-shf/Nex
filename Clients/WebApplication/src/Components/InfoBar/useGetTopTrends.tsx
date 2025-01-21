import { useQuery } from "@tanstack/react-query";
import { APILink } from "../../consts/consts";
import { HashTag } from "../../Interfaces/Interfaces";


function useGetTopTrends() {

    return useQuery({
        queryKey: ['topTrends'],
        queryFn: async () => {
            console.log('entered')
            const result = await fetch(APILink+`core/tag/topTags`, {
                // credentials: 'include'
                headers:{
                    "x-auth-token": localStorage.getItem("x-auth-token") ?? ""
                }
            });
            const jsonResult = await result.json();
            console.log(jsonResult)
            if (result.ok) {
                return jsonResult as  HashTag[]
            } else {
                throw new Error(jsonResult.error);
            }
        },
        staleTime: 6 * 60 * 60 * 1000,
        //
        retry: 2
    })
}
export default useGetTopTrends;