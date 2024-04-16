import Post from "./Post";

const Feed = ({ posts, incrementLikeOf }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          content={post.content}
          likes={post.likes}
          incrementLike={() => incrementLikeOf(post.id)}
        />
      ))}
    </div>
  );
};

export default Feed;
