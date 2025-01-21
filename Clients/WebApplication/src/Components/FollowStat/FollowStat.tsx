import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { useTopBarContext } from "../../contexts/TopBarContext";
import useGetFollowStat from "./useGetFollowStat";
import InfiniteScroll from "react-infinite-scroll-component";
import FollowStatViewer from "./FollowStatViewer";


const FollowStat = () => {
    const { userID } = useParams()
    const [searchParams] = useSearchParams();
    const query = searchParams.get("followers");
    const followers = query === "true"; // Converts "true" to true, everything else to false


    const {data, fetchNextPage } = useGetFollowStat({limit:20 , followers:followers ?? false , userID:userID ?? ''});
    const totalFetchedPosts =
    data?.pages.reduce((total, page) => total + page?.followStats?.length, 0) ||
    0;
    const {setHasBackward , setTitle} = useTopBarContext()
    useEffect(()=>{
        setHasBackward(true)
        if (query){
            setTitle("Followers")
        }else{
            setTitle("Follwing")
        }

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
            <b>this was all</b>
          </p>
        }
      >
        <div>
          {data?.pages.map((page , index)=>(
              <React.Fragment key={index}>
                {page?.followStats?.map(stat=>(
                  <div key={stat.id} className="">
                    {/* <PostViewer post={post}/> */}
                    <FollowStatViewer stat={stat} />
                  </div>
                ))}
              </React.Fragment>
            ))}
        </div>
      </InfiniteScroll>
    )
}

export default FollowStat