import InfiniteScroll from "react-infinite-scroll-component"
import { useTopBarContext } from "../../contexts/TopBarContext";
import React, { useEffect } from "react";
import useGetBookmarks from "./useGetBookmarks";
import PostViewer from "../Post/PostViewer";

const Saves = () => {

  const {data, fetchNextPage } = useGetBookmarks({limit:20});
  const totalFetchedPosts =
  data?.pages.reduce((total, page) => total + page?.posts?.length, 0) ||
  0;
  const {setHasBackward , setTitle} = useTopBarContext()
  useEffect(()=>{
      setHasBackward(false)
      setTitle("Saves")
  },[])

  return (
      <InfiniteScroll
        className="overflow-hidden"
        height={600}
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
        <div>
          {data?.pages.map((page , index)=>(
              <React.Fragment key={index}>
                {page?.posts?.map(post=>(
                  <div key={post.id} className="">
                    <PostViewer post={post}/>
                  </div>
                ))}
              </React.Fragment>
            ))}
        </div>
      </InfiniteScroll>
  )
}

export default Saves