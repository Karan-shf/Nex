import InfiniteScroll from "react-infinite-scroll-component";
import useGetHomePost from "./useGetHomePost";
import PostViewer from "../Post/PostViewer";
import { useTopBarContext } from "../../contexts/TopBarContext";
import React, { useEffect } from "react";

const Home = () => {
  const {data, fetchNextPage } = useGetHomePost({limit:20});
  const totalFetchedPosts =
  data?.pages.reduce((total, page) => total + page?.posts?.length, 0) ||
  0;
  const {setHasBackward , setTitle} = useTopBarContext()
  useEffect(()=>{
      setHasBackward(false)
      setTitle("Home Feed")
  },[])

  return (
    <InfiniteScroll
      dataLength={totalFetchedPosts} // This is the length of the posts array
      next={fetchNextPage} // Function to fetch more data
      hasMore={data?.pages[data?.pages.length-1].hasMore??false} // Boolean to determine if there are more posts
      loader={<span className="loading loading-dots loading-lg"></span>} // Loading indicator
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You have seen all the posts!</b>
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
  );
};

export default Home;
