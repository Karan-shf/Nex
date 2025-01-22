import React, { useState } from "react";
import useGetAllUsers from "./useGetAllUsers";
import InfiniteScroll from "react-infinite-scroll-component";
// import { Menu, MenuItem } from "@headlessui/react";
// import { DotsVerticalIcon } from "@heroicons/react/outline";

const AdminUserManage = () => {
    const [sort , setSort] = useState<"name"| "email"| "username">("username")
    const {data, fetchNextPage } = useGetAllUsers({limit:20 ,order:sort });
    const totalFetchedPosts =
    data?.pages.reduce((total, page) => total + page?.users?.length, 0) ||
    0;

    return (
        <div className="p-6">
            <div className="bg-dark rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-white mb-4">Users</h2>
                <div className="flex  gap-2 items-center mb-4">
                    {/* <input
                        type="text"
                        placeholder="Search Here"
                        className="input input-bordered w-1/2 bg-neutral-focus text-white"
                    /> */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className=" bg-primary text-lg py-2 px-8 rounded-xl m-1">Sort</div>
                        <ul tabIndex={0} className="dropdown-content border-2 border-darkGray menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <button className="py-3 text-base border-b border-darkGray" onClick={()=>{setSort("name")}}>Name</button>
                            <button className="py-3 text-base border-b border-darkGray" onClick={()=>{setSort("email")}}>Email</button>
                            <button className="py-3 text-base border-b border-darkGray" onClick={()=>{setSort("username")}}>Username</button>
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
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Verfication State</th>
                            <th></th>
                        </tr>
                    </thead>
          <tbody>
    
          {data?.pages.map((page , index)=>(
              <React.Fragment key={index}>
                {page?.users?.map(user=>(
                  <tr key={user.id} className="">
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.verificationState}</td>
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

export default AdminUserManage;
