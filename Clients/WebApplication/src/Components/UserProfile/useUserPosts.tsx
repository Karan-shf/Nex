import { APILink } from "../../consts/consts";
import { Post, User } from "../../Interfaces/Interfaces"


import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
    limit: number,
    userID: string
}

function useUserPosts({ limit , userID }: Props) {

    return useInfiniteQuery({
        queryKey: ['userPosts' , userID],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const result = await fetch(`${APILink + "core/post/search"}/?limit=${limit}&offset=${limit * pageParam-20}&userID=${userID}`, {
                // credentials: 'include'
                headers:{
                  "x-auth-token": localStorage.getItem("x-auth-token") ?? ""
                }
            });

            const jsonResult = await result.json();

            if (result.ok) {
                return {
                    posts: jsonResult.data as Post[],
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

export default useUserPosts;
