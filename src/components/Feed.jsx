import Post from "./Post";

const Feed = ({ posts, incrementLikeOf }) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      {sortedPosts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          username={post.user.username}
          content={post.content}
          likes={post.likes}
          createdAt={post.createdAt}
          incrementLike={() => incrementLikeOf(post.id)}
        />
      ))}
    </div>
  );
};

export default Feed;
