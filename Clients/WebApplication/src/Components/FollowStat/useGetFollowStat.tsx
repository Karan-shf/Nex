import { APILink } from "../../consts/consts";
import { FollowStat, Post } from "../../Interfaces/Interfaces"


import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
    limit: number,
    followers:boolean,
    userID:string
}

function useGetFollowStat({ limit ,followers , userID}: Props) {

    return useInfiniteQuery({
        queryKey: ['followStat' , followers , userID],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const result = await fetch(`${APILink + `core/following/${followers ? "userFollowers" : "userFollowings"}`}/?limit=${limit}&offset=${limit * pageParam-20}&id=${userID}`, {
                // credentials: 'include'
                headers:{
                  "x-auth-token": localStorage.getItem("x-auth-token") ?? ""
                }
            });

            const jsonResult = await result.json();

            if (result.ok) {
                return {
                    followStats: jsonResult.data as FollowStat[],
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

export default useGetFollowStat;
