import { APILink } from "../../consts/consts";
import { Post, User } from "../../Interfaces/Interfaces"
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
    limit: number,
    order: "name"| "email"| "username"
}

function useGetAllUsers({ limit , order }: Props) {

    return useInfiniteQuery({
        queryKey: ['allUsers' , order],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const result = await fetch(`${APILink + "iam/admin/allUsers"}/?limit=${limit}&offset=${limit * pageParam-20}&order=${order}`, {
                // credentials: 'include'
                headers:{
                  "x-auth-token": localStorage.getItem("x-auth-token") ?? ""
                }
            });

            const jsonResult = await result.json();

            if (result.ok) {
                return {
                    users: jsonResult.data as User[],
                    hasMore: jsonResult.hasMore as boolean
                };
            } else {
                throw new Error(jsonResult.error);
            }
        },
        staleTime: 6 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasMore ? allPages.length + 1 : undefined;
        }
    });
}

export default useGetAllUsers;
