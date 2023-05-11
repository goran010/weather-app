import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white rounded-t-lg shadow dark:bg-gray-900 mt-16 sm:px-36 px-12">
      <div className="w-full container mx-auto p-4 md:px-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <ul className="flex sm:flex-row flex-col flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className=" hover:underline sm:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className=" hover:underline sm:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className=" hover:underline sm:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
