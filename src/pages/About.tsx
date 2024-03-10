const AboutPage = () => {
  return (
    <main className="px-6 sm:px-20 lg:px-28 w-full flex flex-col min-h-screen items-center py-20 leading-7">
      <h1 className="w-5/6 mb-5 text-blue-900 text-2xl">About this app</h1>
      <div className="w-5/6">
        Welcome to Weather-App - a project built by a student developer to learn
        React!
              <br />
              <br />
        <div>
          This Weather App is a one-person project, made by a developer who's
          eager to level up their React skills. It's a simple and
          straightforward app that gives you the current weather details. I made
          it with a minimalistic design to keep things neat and tidy.
        </div>
        <div></div>
        <br /> Why did I make this?
        <br />
        <div>
          Well, I wanted to get hands-on experience with React and learn how to
          fetch data from APIs. So, I thought, why not build something fun and
          practical at the same time?
        </div>
        <br />
        <ul className="list-disc flex flex-col gap-4 pt-4 text-black ">
          Here's what you can expect from Weather-App:
          <li>
            <span className="text-blue-900 font-bold mr-1">Real Weather Data:</span>
            Weather-App uses APIs to fetch up-to-date weather information. So,
            you can trust that you're getting the latest details.
          </li>
          <li>
            <span className="text-blue-900 font-bold mr-1">
              No Fuss, Just Weather:
            </span>
            The user interface is kept clean and simple. No distractions or
            fancy stuff, just the weather you need.
          </li>
          <li>
            <span className="text-blue-900 font-bold mr-1">Learn with Me:</span> As I
            said, this is a learning project for me. I'm constantly tweaking and
            improving it as I learn new things. Feel free to follow along with
            my progress!
          </li>
          <li>
            <span className="text-blue-900 font-bold mr-1">
              Responsive and Mobile-Friendly: 
            </span>
             Weather-App works smoothly on any device. Whether you're on your
            laptop or your phone, you'll get a seamless experience.
          </li>
          <li>
            <span className="text-blue-900 font-bold mr-1">Open Source Love:</span>
            The code is open source, so if you're learning React too, you can
            take a peek and use it as a reference for your own projects.
          </li>
        </ul>
        <br />I hope you enjoy using Weather-App as much as I enjoyed building
        it. Your feedback is essential to help me grow, so drop me a line if you
        have any suggestions. Weather-App is not just a weather application; it
        represents a journey of self-improvement and dedication to mastering
        React. The project's developer is committed to refining their skills and
        creating a valuable, user-friendly app while actively embracing the
        spirit of continuous learning.Thanks for checking out my little project.
        Happy coding and stay curious! 🚀
      </div>
    </main>
  );
};

export default AboutPage;
