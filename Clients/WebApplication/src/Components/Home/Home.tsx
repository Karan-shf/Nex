import InfiniteScroll from "react-infinite-scroll-component";
import useGetHomePost from "./useGetHomePost";
import { APILink, MediaAddress } from "../../consts/consts";
import defaultUser from "../../assets/images/defaultAvatar.jpg"
import PostBottomBar from "../Post/PostBottomBar";
import PostViewer from "../Post/PostViewer";

const Home = () => {
  const { page, hasmore, data: posts, fetchMorePosts } = useGetHomePost();

  return (
    <InfiniteScroll
      dataLength={posts.length} // This is the length of the posts array
      next={fetchMorePosts} // Function to fetch more data
      hasMore={hasmore} // Boolean to determine if there are more posts
      loader={<h4>Loading...</h4>} // Loading indicator
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You have seen all the posts!</b>
        </p>
      }
    >
      {posts.map((post) => (
        <div key={post.postId} className="post flex px-6 py-3 border w-full border-darkGray">
          <PostViewer post={post}/>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Home;
