import UserAvatar from "./UserAvatar";

const PostHeader = ({ username, createdAt, photo }) => {
  return (
    <div className="card-header d-flex align-items-center">
      <UserAvatar photo={photo} />
      <div className="ml-3">
        <h5 className="mb-0">{username}</h5>
        <small className="text-muted">
          Posted on: {new Date(createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default PostHeader;
