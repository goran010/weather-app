const Profile = () => {
  return (
    <div className="gap-2 flex content-end w-full">
      <img
        className="h-16 w-16 bg-black rounded-full object-fill"
        alt="Profile Picture"
        src="/profile-picture-test.png"
      />
      <div className="w-2/3 flex flex-col justify-end bold">
        <p>Hello! Goran</p>
        <p className="font-semibold leading-4 md:min-w-max">
          Thursday, 26th October, 2023
        </p>
      </div>
    </div>
  );
};

export default Profile;
