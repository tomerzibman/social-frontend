import dayjs from "dayjs";
import UserAvatar from "./UserAvatar";
import relativeTime from "dayjs/plugin/relativeTime";

const PostHeader = ({ username, createdAt, photo }) => {
  dayjs.extend(relativeTime);
  const displayDate = dayjs(createdAt).fromNow();

  return (
    <div className="card-header d-flex align-items-center">
      <UserAvatar photo={photo} />
      <div className="ml-3">
        <h5 className="mb-0">{username}</h5>
        <small className="text-muted">{displayDate}</small>
      </div>
    </div>
  );
};

export default PostHeader;
