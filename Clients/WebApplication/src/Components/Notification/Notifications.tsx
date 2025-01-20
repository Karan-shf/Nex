import React, { useEffect } from "react";
import { useTopBarContext } from "../../contexts/TopBarContext";
import useGetNotifications from "./useGetNotifications";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationViewer from "./NotificationViewer";

const Notifications = () => {
 
  const {setHasBackward , setTitle} = useTopBarContext()
  const {data, fetchNextPage  } = useGetNotifications({limit:20});
  const totalFetchedPosts =
  data?.pages.reduce((total, page) => total + page?.notifications?.length, 0) ||
  0;
  useEffect(()=>{
      setHasBackward(false)
      setTitle("Notifications")
  },[])

  return (
    <div className="overflow-hidden">
      <InfiniteScroll
      className="overflow-hidden"
      height={600}
      
      dataLength={totalFetchedPosts} // This is the length of the posts array
      next={()=>{fetchNextPage()}} // Function to fetch more data
      hasMore={data?.pages[data?.pages.length-1].hasMore??false} // Boolean to determine if there are more posts
      loader={<span className="loading loading-dots loading-lg"></span>} // Loading indicator
      endMessage={
        <p className="mb-4" style={{ textAlign: "center" }}>
          <b>You have seen all your notifications!</b>
        </p>
      }
    > 
      <div className="overflow-hidden">
        {data?.pages.map((page , index)=>(
            <div key={index}>
              {page?.notifications?.map(notif=>(
                <div className="" key={notif.id} >
                  <NotificationViewer notif={notif}/>
                </div>
              ))}
            </div>
          ))}
      </div>
    </InfiniteScroll>

    </div>
  
  )
}

export default Notifications