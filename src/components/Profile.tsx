import { useState } from "react";
import { auth } from "../firebase/firebase";

const Profile = () => {
  const [popUpShow, setPopUpShow] = useState(false);

  const showPopUp = () => {
    setPopUpShow(true);
  };

  const pictureUrl = auth.currentUser?.photoURL;
  return (
    <div className="gap-2 flex content-end w-full relative">
      <img
        className="h-16 w-16 bg-black rounded-full object-fill  cursor-pointer"
        alt="Profile Picture"
        src={`${auth.currentUser?.photoURL}`}
        onClick={() => showPopUp()}
      />
    </div>
  );
};

export default Profile;
