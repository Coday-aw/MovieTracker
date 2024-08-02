import { SearchIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function Header({ searchMovie, handleChange }) {
  return (
    <motion.header
      className="flex justify-between items-center bg-slate-300 px-5 md:px-20 py-5 border-b mb-3 w-full"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <p className="font-bold text-xl text-center sm:text-2xl">Movie Tracker</p>
      <div>
        <Link className="font-bold text-xl hover:text-green-600" href="/">
          Home
        </Link>
      </div>
      <div className="relative sm:w-64">
        <input
          className=" sm:w-full w-32 sm:px-8 sm:py-2 px-8 py-1 rounded-lg"
          type="text"
          placeholder="Search for movies"
          onChange={handleChange}
          value={searchMovie}
        />
        <SearchIcon
          size={18}
          className="absolute top-1/2 transform -translate-y-1/2 left-2"
        />
      </div>
    </motion.header>
  );
}
export default Header;
