import { useFetchAlbumsQuery } from "../store/index.js";
import Skeleton from "./Skeleton.jsx";
import ExpandablePanel from "./ExpandablePanel.jsx";

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user.id);

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album) => (
      <ExpandablePanel key={album.id} header={<div>{album.title}</div>}>
        List of photos in the album
      </ExpandablePanel>
    ));
  }

  return (
    <div>
      <div>Albums for {user.name}</div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
