import { useThunk } from "../hooks/use-thunk";
import { deleteUser } from "../store/index";
import Button from "./Button.jsx";
import { GoTrashcan } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel.jsx";

const UsersListItem = ({ user }) => {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  const handleClick = () => {
    doDeleteUser(user.id);
  };

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user</div>}
      {user.name}
    </>
  );

  return <ExpandablePanel header={header}>Content</ExpandablePanel>;
};

export default UsersListItem;
