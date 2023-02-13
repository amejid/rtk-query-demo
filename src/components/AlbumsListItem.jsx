import ExpandablePanel from "./ExpandablePanel.jsx";
import Button from "./Button.jsx";
import { GoTrashcan } from "react-icons/go";
import { useDeleteAlbumMutation } from "../store/index.js";

const AlbumsListItem = ({ album }) => {
  const [deleteAlbum, results] = useDeleteAlbumMutation();

  const handleDeleteAlbum = () => {
    deleteAlbum(album);
  };

  const header = (
    <>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleDeleteAlbum}
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      List of photos in the album
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
