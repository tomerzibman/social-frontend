import Post from "./Post";

const Feed = ({ posts, incrementLikeOf, createComment }) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      {sortedPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          username={post.user.username}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          createdAt={post.createdAt}
          incrementLike={() => incrementLikeOf(post.id)}
          createComment={createComment}
        />
      ))}
    </div>
  );
};

export default Feed;
