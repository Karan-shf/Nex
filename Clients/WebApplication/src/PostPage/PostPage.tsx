import { useParams } from "react-router-dom"
import useGetPost from "./useGetPost";
import PostViewer from "../Components/Post/PostViewer";
import React, { useEffect } from "react";
import { useTopBarContext } from "../contexts/TopBarContext";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetPostComments from "./useGetPostComments";
import PostAComment from "../PostAPost/PostAComment";

const PostPage = () => {
    const {id} = useParams()
    const {data:post , isLoading , error } = useGetPost(id ?? ""); 
    const {setHasBackward , setTitle} = useTopBarContext()
    const {data, fetchNextPage } = useGetPostComments({limit:20 , postid:Number(id)});
    const totalFetchedPosts =
    data?.pages.reduce((total, page) => total + page?.posts?.length, 0) ||
    0;
    useEffect(()=>{
        setHasBackward(true)
        setTitle("Post")
    },[])
    

    

    return (
    <div>
        {!isLoading ?
            <div>
                <PostViewer main={true} post={post}/>
                <PostAComment type={"Comment"}/>
                <InfiniteScroll
                    dataLength={totalFetchedPosts} // This is the length of the posts array
                    next={fetchNextPage} // Function to fetch more data
                    hasMore={data?.pages[data?.pages.length-1].hasMore??false} // Boolean to determine if there are more posts
                    loader={<span className="loading loading-dots loading-lg"></span>} // Loading indicator
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                        {data?.pages[0].posts.length!=0 
                            ?   <b>You Have Aquired All Nexuses</b>
                            :   <b>No Rooted Nexuses Yet.. </b>
                        }
                        </p>
                    }
                    >

                    {data?.pages.map((page , index)=>(
                        <React.Fragment key={index}>
                            {page?.posts?.map(post=>(
                            <div key={post.id} className="">
                                <PostViewer post={post}/>
                            </div>
                            ))}
                        </React.Fragment>
                    ))}
                </InfiniteScroll>
            </div>
            :
            <div className="w-full h-full flex justify-center items-center"><span className="loading loading-dots loading-lg"></span></div>
        }
    </div>
    )
}

export default PostPage