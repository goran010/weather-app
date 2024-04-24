import { auth } from "../firebase/firebase";

const Profile = () => {
  const pictureUrl = auth.currentUser?.photoURL || "/profile-picture-test.png";
  
  return (
    <div className="gap-2 flex content-end w-full">
      <img
        className="h-16 w-16 bg-black rounded-full object-fill cursor-pointer"
        alt="Profile Picture"
        src={pictureUrl}
      />
    </div>
  );
};

export default Profile;
