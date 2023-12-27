const Profile = () => {
  return (
    <div className="gap-2 col-start-1 col-end-6 row-start-2 row-span-4 hidden lg:flex content-end">
      <div className="bg-black rounded-full w-16 h-16"></div>
      <div className="w-2/3 flex flex-col justify-end">
        <p>Hello! Goran</p> <p className="font-semibold leading-4">Thursday, 26th October, 2023</p>
      </div>
    </div>
  );
};

export default Profile;
