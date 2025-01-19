import { useParams } from "react-router-dom"
import useGetPost from "./useGetPost";
import PostViewer from "../Components/Post/PostViewer";
import { useEffect } from "react";
import { useTopBarContext } from "../contexts/TopBarContext";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetPostComments from "./useGetPostComments";
import PostAComment from "../PostAPost/PostAComment";

const PostPage = () => {
    const {id} = useParams()
    const {data:post , isLoading , error } = useGetPost(id ?? ""); 
    const {setHasBackward , setTitle} = useTopBarContext()
    const { page, hasmore, data: comments, fetchMorePosts } = useGetPostComments();
    useEffect(()=>{
        setHasBackward(true)
        setTitle("Post")
    },[])
    
    // const post = {
    //     id: 1,
    //     mediaFileName: "media1",
    //     mediaType : "image" as "video"|"image"|undefined ,
    //     postType: "Post" as "Post"|"Comment"|"Quote",
    //     isLiked:true,
    //     isBookmarked:false,
    //     postDate: new Date("2023-12-01T12:00:00"),
    //     content: "Just completed my first marathon! 🏃‍♂️",
    //     like: 150,
    //     comments: 20,
    //     view: 1200,
    //     author: {
    //       name: "John Doe",
    //       username: "john_doe",
    //       userID: 101,
    //       profilePic: "https://via.placeholder.com/150",
    //     },
    // }
    

    return (
    <div>
        {!isLoading ?
            <div>
                <PostViewer main={true} post={post}/>
                <PostAComment/>
                <InfiniteScroll
                    dataLength={comments.length} // This is the length of the posts array
                    next={fetchMorePosts} // Function to fetch more data
                    hasMore={hasmore} // Boolean to determine if there are more posts
                    loader={<h4>Loading...</h4>} // Loading indicator
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                        <b>You have seen all the posts!</b>
                        </p>
                    }
                    >
                    {comments.map((comment) => (
                        <div key={comment.id} className="">
                        <PostViewer post={comment}/>
                        </div>
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