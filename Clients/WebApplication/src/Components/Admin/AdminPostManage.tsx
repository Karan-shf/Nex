import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetAllPosts from "./useGetAllPosts";
import { formatPostDateTime, formatPostsDate } from "../../functions/functions";
// import { Menu, MenuItem } from "@headlessui/react";
// import { DotsVerticalIcon } from "@heroicons/react/outline";

const AdminPostManage = () => {
    const [sort , setSort] = useState<"postDate"|"views"|"likes">("postDate")
    const {data, fetchNextPage } = useGetAllPosts({limit:20 ,order:sort });
    const totalFetchedPosts =
    data?.pages.reduce((total, page) => total + page?.posts?.length, 0) ||
    0;

    return (
        <div className="p-6">
            <div className="bg-dark rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-white mb-4">Posts</h2>
                <div className="flex  gap-2 items-center mb-4">
                    {/* <input
                        type="text"
                        placeholder="Search Here"
                        className="input input-bordered w-1/2 bg-neutral-focus text-white"
                    /> */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className=" bg-primary text-lg py-2 px-8 rounded-xl m-1">Sort</div>
                        <ul tabIndex={0} className="dropdown-content border-2 border-darkGray menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <button className="py-3 text-base border-b border-darkGray" onClick={()=>{setSort("postDate")}}>Post Date</button>
                            <button className="py-3 text-base border-b border-darkGray" onClick={()=>{setSort("views")}}>Views</button>
                            <button className="py-3 text-base border-b border-darkGray" onClick={()=>{setSort("likes")}}>Likes</button>
                        </ul>
                    </div>
                </div>

      <InfiniteScroll
        className="overflow-hidden"
        height={500}
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
                <table className="table table-auto w-full bg-neutral-focus text-white">
                    <thead className="">
                        <tr>
                            <th>Post ID</th>
                            <th>Author</th>
                            <th>Likes</th>
                            <th>Views</th>
                            <th>Post Date</th>
                        </tr>
                    </thead>
          <tbody>
    
          {data?.pages.map((page , index)=>(
              <React.Fragment key={index}>
                {page?.posts?.map(post=>(
                  <tr key={post.id} className="">
                    <td>{post?.id}</td>
                    <td>{post?.author?.username}</td>
                    <td>{post?.likes}</td>
                    <td>{post?.views}</td>
                    <td>{formatPostsDate(post.postDate) }</td>


                    {/* <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.verificationState}</td> */}
                  </tr>
                ))}
              </React.Fragment>
            ))}
                    </tbody>
 
                </table>
      </InfiniteScroll>
            </div>
        </div>
    );
};

export default AdminPostManage;
