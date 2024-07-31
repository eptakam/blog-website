import FeaturedPosts from "../../components/home-page/featured-posts";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-utils";

export default function AllPostsPage(props) {
  return <AllPosts posts={props.posts} />;
}

export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts
    },
  };
}
