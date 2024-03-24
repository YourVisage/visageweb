// components/Header.tsx

import Link from 'next/link';
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 py-4 my-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
          <Image
              src="/logo.svg"
              alt="visage Logo"
              className="dark:invert"
              width={40}
              height={40}
              priority
              />
          </Link>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-grow justify-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/faceswap">
                 <p className="text-white hover:text-gray-300">Царай солих</p>
              </Link>
            </li>
            <div className='p-4'/>
            <li>
              <Link href="/login">
                <p className="text-white hover:text-gray-300">Царай таних</p>
              </Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
        
        {/* Login Button */}
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
