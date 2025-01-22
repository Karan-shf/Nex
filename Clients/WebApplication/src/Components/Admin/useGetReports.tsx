import { APILink } from "../../consts/consts";
import { Post, Report } from "../../Interfaces/Interfaces"


import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
    limit: number,
    time: "pending"|"history"
    type: 'post'|'user'
}

function useGetReports({ limit , time , type }: Props) {

    return useInfiniteQuery({
        queryKey: ['Reports' , time , type],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const result = await fetch(`${APILink + `core/admin/${type}Reports/${time}`}/?limit=${limit}&offset=${limit * pageParam-20}`, {
                // credentials: 'include'
                headers:{
                  "x-auth-token": localStorage.getItem("x-auth-token") ?? ""
                }
            });

            const jsonResult = await result.json();

            if (result.ok) {
                return {
                    reports: jsonResult.data as Report[],
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

export default useGetReports;
