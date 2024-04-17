import UserAvatar from "./UserAvatar";

const PostHeader = ({ username, createdAt }) => {
  return (
    <div className="card-header d-flex align-items-center">
      <UserAvatar />
      <div>
        <h5 className="mb-0">{username}</h5>
        <small>Posted on: {new Date(createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default PostHeader;
