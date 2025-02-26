import { Link } from "react-router-dom"
import { Symbolize } from "../../functions/functions"
import { Post } from "../../Interfaces/Interfaces"
import IconViewer from "./IconViewer"
import { useEffect, useState } from "react"
import { APILink } from "../../consts/consts"


interface PostInfo{
    post:Post|undefined
}

const PostBottomBar = ({post}:PostInfo) => {
    const [isLiked , setIsLiked] = useState<boolean>(false)
    const [isBookmarked , setIsBookMarked] = useState<boolean>(false)


    async function ToggleLike(){
        setIsLiked(!isLiked)
                try {
                    const res = await fetch(APILink+"core/post/toggleLike", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json", 
                        "x-auth-token":localStorage.getItem("x-auth-token") ?? ""
                      },
                      body: JSON.stringify({"postID":post?.id}), 
                    });
              
                    const result = await res.json(); 
                    
                    if(result.success){
        
                    }else{
        
                    }
                    if (res.ok) {
                      console.log("Request successful:", result);
                    } else {
                      console.log("Request failed:", result);
                    }
                  } catch (error) {
                    console.error("Error occurred:", error);
                  }
    }

    async function ToggleBookmark(){
        setIsBookMarked(!isBookmarked)
                try {
                    const res = await fetch(APILink+"core/post/toggleBookmark", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json", 
                        "x-auth-token":localStorage.getItem("x-auth-token") ?? ""
                      },
                      body: JSON.stringify({"postID":post?.id}), 
                    });
              
                    const result = await res.json(); 
                    
                    if(result.success){
        
                    }else{
        
                    }
                    if (res.ok) {
                      console.log("Request successful:", result);
                    } else {
                      console.log("Request failed:", result);
                    }
                  } catch (error) {
                    console.error("Error occurred:", error);
                  }
    }

    useEffect(()=>{
        setIsLiked(post?.isLiked ?? false)
        setIsBookMarked(post?.isBookmarked ?? false)
    },[])
  return (
    <div className="flex justify-between text-secondary">

        <Link to={String("/"+post?.id)} className={"flex gap-1 items-center hover:text-blue"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <p>{Symbolize(post?.comments??0)}</p>
        </Link>
        
        <button onClick={ToggleLike} className={`flex gap-1 items-center hover:text-primary ${isLiked && "text-primary"} `}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth= {2} stroke="currentColor" className={`size-5`}>
                <path strokeLinecap="round" strokeLinejoin="round" d={isLiked
                     ? "m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" 
                     : "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"} />
            </svg>

            {/* <p>{Symbolize(post?.likes??0)}</p> */}
            {!(isLiked !== post?.isLiked) && <p>{Symbolize(post?.likes ??0)}</p>}
            {isLiked && !(post?.isLiked ?? false) && <p>{Symbolize((post?.likes ?? 0) + 1)}</p>}
            {!isLiked && post?.isLiked && <p>{Symbolize(post?.likes -1)}</p>}
        </button>

        <button className={"flex gap-1 items-center hover:text-purple"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <   path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
            </svg>

            <p>{Symbolize(post?.views??0)}</p>
        </button>

        <button className={"flex gap-1 items-center hover:text-green"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>
        </button>

        <button onClick={ToggleBookmark}  className={`flex gap-1 items-center hover:text-cyan ${isBookmarked && "text-cyan"} `}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth= {2} stroke="currentColor" className={`size-5`}>
                <path strokeLinecap="round" strokeLinejoin="round" d={isBookmarked
                     ? "M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" 
                     : "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"} />
            </svg>
            {!(isBookmarked !== post?.isBookmarked) && <p>{Symbolize(post?.bookmarks ??0)}</p>}
            {isBookmarked && !(post?.isBookmarked ?? false) && <p>{Symbolize((post?.bookmarks ?? 0) + 1)}</p>}
            {!isBookmarked && post?.isBookmarked && <p>{Symbolize(post?.bookmarks -1)}</p>}
        </button>
    </div>
  )
}

{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
</svg> */}






export default PostBottomBar