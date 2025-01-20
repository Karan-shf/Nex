import { useInfiniteQuery } from "@tanstack/react-query";
import { APILink } from "../../consts/consts";
import {Notifs } from "../../Interfaces/Interfaces";


interface Props {
    limit: number,
}

const useGetNotifications = ({limit}:Props) => {
    console.log("entered")
    return useInfiniteQuery({
        queryKey: ['notifs'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const result = await fetch(`${APILink + "core/notif"}/?limit=${limit}&offset=${limit * (pageParam - 1)}
`, {
                // credentials: 'include'
                headers:{
                  "x-auth-token": localStorage.getItem("x-auth-token") ?? ""
                }
            });

            const jsonResult = await result.json();

            if (result.ok) {
                return {
                    notifications: jsonResult.data as Notifs[],
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

export default useGetNotifications