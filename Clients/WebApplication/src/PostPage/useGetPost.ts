import { useQuery } from "@tanstack/react-query";
import { APILink } from "../consts/consts";
import { Post } from "../Interfaces/Interfaces";


function useGetPost(id: string) {

    console.log("iddddddd", id)
    return useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            console.log('entered')
            const result = await fetch(APILink + `core/post/${id}`, {
                headers: {
                    "x-auth-token": localStorage.getItem("x-auth-token") ?? ""
                },
            });
            const jsonResult = await result.json();
            console.log(jsonResult)
            if (result.ok) {
                return jsonResult as { data: Post | undefined }
            } else {
                throw new Error(jsonResult.error);
            }
        },
        staleTime: 6 * 60 * 60 * 1000,
        //
        retry: 2
    })
}
export default useGetPost;