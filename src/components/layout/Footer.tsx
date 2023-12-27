const Footer = () => {
  return (
    <footer className="rounded-t-lg shadow dark:bg-gray-900 mt-16 sm:px-28 px-8 py-2 sm:py-0">
      <div className="w-full container py-6  md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <ul className="flex sm:flex-row gap-2 sm:gap-0 flex-col flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className=" hover:underline sm:mr-6 ">
                About
              </a>
            </li>

            <li>
              <a
                href="https://github.com/goran010"
                target="_blank"
                rel="noreferrer"
                className="  hover:underline sm:mr-6 "
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/goran-markovi%C4%87-b2662920a/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          © 2023{" "}
          <a
            href="https://github.com/goran010/weather-app"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Weather app - Goran Marković
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
