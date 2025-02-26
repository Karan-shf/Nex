import { useInfiniteQuery } from "@tanstack/react-query";
import { Post } from "../Interfaces/Interfaces"
import { APILink } from "../consts/consts";

// const posts: Post[] = [
//     {
//       id: 1,
//       mediaFileName: "media1",
//       mediaType:"image",
//       postType: "Post",
//       isLiked:true,
//       isBookmarked:false,
//       postDate: new Date("2023-12-01T12:00:00"),
//       content: "Just completed my first marathon! 🏃‍♂️",
//       like: 150,
//       comments: 20,
//       view: 1200,
//       author: {
//         name: "John Doe",
//         username: "john_doe",
//         userID: 101,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//     {
//       id: 2,
//       postType: "Comment",
//       isLiked:false,
//       isBookmarked:false,
//       postDate: new Date("2023-12-02T14:30:00"),
//       content: "Amazing achievement! Congrats!",
//       repliesTo: 1,
//       like: 20,
//       comments: 5,
//       view: 100,
//       author: {
//         name: "Jane Smith",
//         username: "jane_smith",
//         userID: 102,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//     {
//       id: 3,
//       postType: "Quote",
//       isLiked:true,
//       isBookmarked:true,
//       postDate: new Date("2023-12-03T16:45:00"),
//       content: "The journey of a thousand miles begins with one step. 🚶‍♀️",
//       quotedFrom: 1,
//       like: 80,
//       comments: 10,
//       view: 500,
//       author: {
//         name: "Alice Johnson",
//         username: "alice_johnson",
//         userID: 103,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//     {
//       id: 4,
//       mediaFileName: "media4",
//       mediaType:"image",
//       isLiked:false,
//       isBookmarked:false,
//       postType: "Post",
//       postDate: new Date("2023-12-04T10:15:00"),
//       content: "Enjoying a beautiful sunset 🌅",
//       like: 120,
//       comments: 15,
//       view: 800,
//       author: {
//         name: "Bob Martin",
//         username: "bob_martin",
//         userID: 104,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//     {
//       id: 5,
//       postType: "Comment",
//       isLiked:false,
//       isBookmarked:false,
//       postDate: new Date("2023-12-05T18:00:00"),
//       content: "Stunning view! 😍",
//       repliesTo: 4,
//       like: 30,
//       comments: 3,
//       view: 200,
//       author: {
//         name: "Emma Wilson",
//         username: "emma_wilson",
//         userID: 105,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//     {
//       id: 6,
//       mediaFileName: "media6",
//       mediaType: "video",
//       postType: "Quote",
//       isLiked:false,
//       isBookmarked:true,
//       postDate: new Date("2023-12-06T12:00:00"),
//       content: "Nature is the best artist 🌳",
//       quotedFrom: 4,
//       like: 50,
//       comments: 8,
//       view: 400,
//       author: {
//         name: "Chris Brown",
//         username: "chris_brown",
//         userID: 106,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//     {
//       id: 7,
//       postType: "Post",
//       isLiked:false,
//       isBookmarked:false,
//       postDate: new Date("2023-12-07T08:30:00"),
//       content: "Finally learned to cook pasta 🍝",
//       like: 90,
//       comments: 12,
//       view: 700,
//       author: {
//         name: "Diana Ross",
//         username: "diana_ross",
//         userID: 107,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//     {
//       id: 8,
//       postType: "Comment",
//       isLiked:true,
//       isBookmarked:false,
//       postDate: new Date("2023-12-08T09:45:00"),
//       content: "Looks delicious! What recipe did you use?",
//       repliesTo: 7,
//       like: 10,
//       comments: 2,
//       view: 150,
//       author: {
//         name: "Edward White",
//         username: "edward_white",
//         userID: 108,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//     {
//       id: 9,
//       postType: "Quote",
//       isLiked:true,
//       isBookmarked:false,
//       postDate: new Date("2023-12-09T11:00:00"),
//       content: "Cooking is a form of art! 🎨",
//       quotedFrom: 7,
//       like: 60,
//       comments: 7,
//       view: 350,
//       author: {
//         name: "Fiona Green",
//         username: "fiona_green",
//         userID: 109,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//     {
//       id: 10,
//       postType: "Post",
//       isLiked:false,
//       isBookmarked:false,
//       postDate: new Date("2023-12-10T15:20:00"),
//       content: "Weekend vibes! 🌞",
//       like: 200,
//       comments: 25,
//       view: 1500,
//       author: {
//         name: "George Harris",
//         username: "george_harris",
//         userID: 110,
//         profilePic: "https://via.placeholder.com/150",
//       },
//     },
//   ];
  
 
  
interface GetPostCommentsInterface{
    limit:number,
    postid:number
}

const useGetPostComments = ({limit , postid}:GetPostCommentsInterface) => {
    return useInfiniteQuery({
        queryKey: ['comments' , postid],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const result = await fetch(`${APILink + "core/post/comments"}/?limit=${limit}&offset=${limit * pageParam-20}&id=${postid}`, {
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

export default useGetPostComments