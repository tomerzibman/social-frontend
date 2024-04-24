import Post from "./Post";

const Feed = ({
  posts,
  likePost,
  unlikePost,
  createComment,
  loggedIn,
  userId,
}) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="row">
      {sortedPosts.map((post) => (
        <div className="mb-4" key={post.id}>
          <Post
            id={post.id}
            title={post.title}
            username={post.user.username}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
            onLike={() => likePost(post.id)}
            onUnlike={() => unlikePost(post.id)}
            createComment={createComment}
            photo={post.user.photo}
            loggedIn={loggedIn}
            posterId={post.user.id}
            userId={userId}
          />
        </div>
      ))}
    </div>
  );
};

export default Feed;
