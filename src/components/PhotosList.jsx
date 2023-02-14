import { useAddPhotoMutation, useFetchPhotosQuery } from "../store/index.js";
import Button from "./Button.jsx";
import Skeleton from "./Skeleton.jsx";
import PhotosListItem from "./PhotosListItem.jsx";

const PhotosList = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album.id);
  const [addPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album.id);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error fetching photos</div>;
  } else {
    content = data.map((photo) => (
      <PhotosListItem key={photo.id} photo={photo} />
    ));
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
};

export default PhotosList;
