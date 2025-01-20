import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import useGetSearchResults from "./useGetSearchResults";
import React from "react";
import PostViewer from "../Post/PostViewer";
import SearchBar from "./SearchBar";

const SearchResult = () => {
    const [searchParams, setSearchParams] = useSearchParams(); 
    const content = searchParams.get('content') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const {data, fetchNextPage } = useGetSearchResults({limit:20 , content , startDate , endDate  });
    const totalFetchedPosts =
    data?.pages.reduce((total, page) => total + page?.posts?.length, 0) ||
    0;


    return (
        <div>
            <SearchBar link=""/>
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
        </div>
    )
}

export default SearchResult