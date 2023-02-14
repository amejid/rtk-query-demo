import { useDeletePhotoMutation } from "../store/index.js";
import { GoTrashcan } from "react-icons/go";

const PhotosListItem = ({ photo }) => {
  const [deletePhoto] = useDeletePhotoMutation();

  const handleDeletePhoto = () => {
    deletePhoto(photo.id);
  };

  return (
    <div onClick={handleDeletePhoto} className="relative cursor-pointer m-2">
      <img className="h-20 w-20" src={photo.url} alt="Random Pic" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
};
export default PhotosListItem;
