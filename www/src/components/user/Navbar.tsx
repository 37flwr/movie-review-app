import { BsFillSunFill } from "react-icons/bs";
import BasicLayout from "../layout/BasicLayout";

const Navbar = () => {
  return (
    <div className="bg-secondary">
      <BasicLayout className="p-2">
        <img src="./logo.png" alt="" className="h-10" />
        <ul className="flex items-center space-x-4">
          <li>
            <button className="bg-dark-subtle p-1 rounded">
              <BsFillSunFill className="text-secondary" size={24} />
            </button>
          </li>
          <li>
            <input
              type="text"
              className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
              placeholder="Search..."
            />
          </li>
          <li className="text-white font-semibold text-lg">Login</li>
        </ul>
      </BasicLayout>
    </div>
  );
};

export default Navbar;